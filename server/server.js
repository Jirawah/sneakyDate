import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import * as jose from 'jose'

import dotenv from "dotenv";
dotenv.config();

process.on("uncaughtException", (err) => {
  console.error("Erreur non gérée :", err);
});

const app = express();
const PORT = 3000;
const JWT_SECRET = "sneakyDate";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.use(
  cors({
    origin: "http://localhost:4200", // L'URL de votre application Angular
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true, // Permettre les informations d'authentification (cookies, en-têtes)
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

// Parse JSON requests
app.use(bodyParser.json());

// Configuration de la connexion à MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sneakydate",
  port: 3306,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

const getUserByEmail = async function (email, callback) {
  const query = "SELECT * FROM member WHERE email = ?";

  return connection.query(query, email, function (err, results) {
    // if (err) return callback(err, null);
    return callback(err, results[0]);
  });
};

const getUserById = (id, callback) => {
  const query = "SELECT * FROM Member WHERE member_id = ?";

  connection.query(query, id, (err, results) => {
    if (err) return callback(err, null);
    return results.length ? callback(null, results) : callback(null, null);
  });
};

const getUserByName = (name, callback) => {
  const query = "SELECT * FROM member WHERE memberName = ?";

  connection.query(query, name, (err, results) => {
    if (err) return callback(err, null);
    return results.length ? callback(null, results) : callback(null, null);
  });
};

app.use(
  session({
    secret: "secret", // Changez ceci à une clé secrète unique
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/rdvs", (req, res) => {
  const dateId = req.query.dateId;
  console.log(dateId);
  const query = "SELECT * FROM 'rdv' WHERE cardbox_id = ?";
  connection.query(query, dateId, (err, results) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des RDVs." });
    } else {
      res.json(results);
    }
  });
});

app.post("/api/rdv", (req, res) => {
  const { cardbox_id, rdvName, orga, guestList, statut } = req.body;
  console.log("Data received for RDV:", {
    cardbox_id,
    rdvName,
    orga,
    guestList,
    statut,
  });
  const member_id = 1;
  const query = `INSERT INTO RDV (cardbox_id, rdvName, orga, statut, member_id) VALUES (?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [cardbox_id, rdvName, orga, statut, member_id],
    (err, result) => {
      if (err) {
        console.error(err); // Log the error
        res.status(500).send("Error saving RDV to database: " + err.message);
      } else {
        res.status(200).send("RDV created successfully");
      }
    }
  );
});

// Route d'inscription
app.post("/register", async (req, res) => {
  const { memberName, email, password } = req.body;

  try {
    // Vérifier si l'email ou le pseudonyme existe déjà
    getUserByEmail(email, (err, userByEmail) => {
      if (userByEmail) {
        return res.status(400).json({ error: "Email already in use" });
      }

      getUserByName(memberName, (err, userByName) => {
        if (userByName) {
          return res.status(400).json({ error: "Username already in use" });
        }

        // Si ni l'email ni le pseudonyme ne sont utilisés, continuez l'enregistrement
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            return res
              .status(500)
              .send("Erreur serveur lors du hashage du mot de passe.");
          }

          const query =
            "INSERT INTO member (memberName, email, password) VALUES (?, ?, ?)";
          connection.query(
            query,
            [memberName, email, hashedPassword],
            (err, result) => {
              if (err) {
                return res
                  .status(500)
                  .send("Erreur serveur lors de l'enregistrement.");
              }
              res.status(200).json({ message: "Compte créé avec succès" });
            }
          );
        });
      });
    });
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
});

app.post("/login", (req, res) => {
  // try {
  console.log("Requête de connexion reçue");

  const { email, password } = req.body;
  // console.log("Email reçu :", email); // Affichez l'email reçu dans la console
  // console.log("Mot de passe reçu :", password);
  console.log(req.body);
  getUserByEmail(email, (err, user) => {
    console.log(user);
    bcrypt.compare(password, user.password, async (err, isMatch) => {
      // if (err || !isMatch) {
      //   return res.status(400).json({ error: "Incorrect password" });
      // }

      const secret = new TextEncoder().encode(JWT_SECRET);
      // Générez un JWT
      const token = await new jose.SignJWT({ memberId: user.member_id })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('4h')
        .sign(secret)

      return res.json({ memberName: user.memberName, token });
    });
  });
  // if (err || !user) {
  //   return res.status(400).json({ error: 'User not found' });
  // }

  // Comparez le mot de passe envoyé avec le mot de passe haché dans la base de données
  // } catch (error) {
  //   console.error("Erreur lors de la demande de connexion :", error);
  //   return res.status(500).json({ error: "Erreur serveur" });
  // }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/members/:id", (req, res) => {
  const memberId = req.params.id; // Récupérez l'ID du membre à partir de la route

  // Utilisez l'ID pour interagir avec votre base de données et obtenir les informations du membre
  // Par exemple, vous pouvez utiliser la fonction getUserById que vous avez définie précédemment

  getUserById(memberId, (err, user) => {
    if (err) {
      console.error("Erreur lors de la récupération des données du membre :", err);
      res.status(500).send("Erreur interne du serveur");
      return;
    }

    if (user) {
      // Si vous avez réussi à obtenir les données du membre, renvoyez-les au client
      console.log(user);
      res.json(user[0]);
    } else {
      // Si le membre avec l'ID spécifié n'a pas été trouvé, renvoyez une réponse appropriée (par exemple, 404 Not Found)
      res.status(404).send("Membre non trouvé");
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.post('/register', async (req, res) => {
//     const { memberName, email, password } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10); // Hash le mot de passe

//         const query = "INSERT INTO member (memberName, email, password) VALUES (?, ?, ?)";
//         connection.query(query, [memberName, email, hashedPassword], (err, result) => {
//           if (err) {
//               console.log("Erreur SQL:", err); // Ajoutez cette ligne
//               res.status(500).send("Le pseudonyme ou l'adresse mail choisis existe déjà");
//           } else {
//             res.status(200).json({ message: "Compte créé avec succès" });
//           }
//       });
//     } catch {
//         res.status(500).send('Erreur serveur');
//     }
// });

app.get("/members", (req, res) => {
  connection.query("SELECT * FROM member", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/cardbox/:cardbox_id", (req, res) => {
  const cardboxId = req.params.cardbox_id;
  const query = "SELECT date FROM cardbox WHERE cardbox_id = ?";

  connection.query(query, [cardboxId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des données:", err);
      res.status(500).send("Erreur interne du serveur");
      return;
    }

    if (results.length > 0) {
      res.json(results[0]); // renvoyer le premier résultat (puisqu'il devrait y avoir un seul enregistrement correspondant)
    } else {
      res.status(404).send("Cardbox not found");
    }
  });
});

app.get("/members/by-username/:username", (req, res) => {
  const username = req.params.username; // Récupérez le nom d'utilisateur depuis la route

  // Utilisez le nom d'utilisateur pour interagir avec votre base de données et obtenir les informations du membre
  // Vous pouvez utiliser une requête SQL pour cela

  // Exemple de requête SQL (utilisez votre propre schéma de base de données)
  const query = "SELECT * FROM member WHERE memberName = ?";

  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des données du membre :", err);
      res.status(500).send("Erreur interne du serveur");
      return;
    }

    if (results.length > 0) {
      // Si vous avez réussi à obtenir les données du membre, renvoyez-les au client
      res.json(results[0]); // renvoyer le premier résultat (puisqu'il devrait y avoir un seul enregistrement correspondant)
    } else {
      // Si le membre avec le nom d'utilisateur spécifié n'a pas été trouvé, renvoyez une réponse appropriée (par exemple, 404 Not Found)
      res.status(404).send("Membre non trouvé");
    }
  });
});
// connection.end();  // NOTE: Je ne recommande pas de fermer la connexion juste après la création de votre serveur. La connexion devrait rester ouverte tant que votre serveur est en marche.

// const express = require('express');
// const mysql = require('mysql');

// const app = express();
// const PORT = 3000;

// // Parse JSON requests
// app.use(bodyParser.json());

// // Configuration de la connexion à MySQL
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'sneakydate'
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connecté à la base de données MySQL!');
// });

// // Routes et autres logiques peuvent être ajoutées ici

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// app.get('/rdvs', (req, res) => {
//     const dateId = req.query.dateId;

//     // Requête SQL pour récupérer les RDVs basés sur le dateId
//     const query = "SELECT * FROM rdv_table WHERE dateId = ?";

//     connection.query(query, [dateId], (err, results) => {
//       if (err) {
//         // Gestion d'erreur: renvoie une réponse d'erreur
//         res.status(500).json({ error: 'Erreur lors de la récupération des RDVs.' });
//       } else {
//         // Renvoie les résultats de la requête
//         res.json(results);
//       }
//     });
//   });

//   connection.end();
