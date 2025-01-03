import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { jwtVerify } from "jose";
import cron from "node-cron";

import dotenv from "dotenv";
dotenv.config();

process.on("uncaughtException", (err) => {
  console.error("Erreur non gérée :", err);
});

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

const app = express();
const PORT = 3000;
const JWT_SECRET = "sneakyDate";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const decoded = jose.JWT.verify(token, secret);

      req.user = decoded;
      console.log(req.user, decoded);
      next();
    } catch (err) {
      console.error("JWT verification error:", err.message);
      return res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
  //   jwt.verify(token, JWT_SECRET, (err, user) => {
  //     if (err) {
  //       return res.sendStatus(403);
  //     }

  //     req.user = user;
  //     next();
  //   });
  // } else {
  //   res.sendStatus(401);
  // }
};

// app.use(async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Bearer Token

//   if (!token) {
//     return res.status(401).send({ message: "Token is required" });
//   }

//   try {
//     const payload = await verifyToken(token);
//     req.user = payload; // Ajoutez le payload du JWT à l'objet de requête pour l'utiliser plus tard
//     next();
//   } catch (error) {
//     res.status(401).send({ message: "Invalid token" });
//   }
// });

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
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

// Tâche planifiée pour exécuter tous les jours à minuit
cron.schedule("0 0 * * *", function () {
  deleteOldRdvs();
});

function deleteOldRdvs() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  // // Suppression des rdv antérieurs à la date actuelle
  // connection.query("DELETE FROM rdv WHERE DATE(date) < ?", [formattedDate], (error, results) => {
  //   if (error) throw error;
  //   console.log(`Supprimé ${results.affectedRows} rdvs.`);
  // });
  // }
  // Suppression des rdv antérieurs à la date actuelle
  connection.query(
    "DELETE rdv FROM rdv INNER JOIN cardbox ON rdv.carbox_id = cardbox.id WHERE DATE(cardbox.date) < CURRENT_DATE;",
    [formattedDate],
    (error, results) => {
      if (error) throw error;
      console.log(`Supprimé ${results.affectedRows} rdvs.`);
    }
  );
}

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
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  });
});

app.post("/api/rdv", (req, res) => {
  const { member_id, cardbox_id, rdvName, orga, guestList, statut } = req.body;
  console.log(req.body);
  const query = `INSERT INTO RDV (cardbox_id, rdvName, orga, statut, member_id) VALUES (?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [cardbox_id, rdvName, orga, statut, member_id],
    (err, result) => {
      if (err) {
        console.error("err", err); // Log the error
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    }
  );
});

app.get("/rdvs/:id", (req, res) => {
  const cardbox_id = req.params.id;
  console.log(cardbox_id);
  const query = "SELECT * FROM rdv WHERE cardbox_id = ?";

  connection.query(query, [cardbox_id], (err, results) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des RDVs." });
    } else {
      res.status(200).json(results);
    }
  });
});
// const cardboxId = req.params.cardbox_id;
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
  console.log("Requête de connexion reçue");

  const { email, password } = req.body;
  console.log(req.body);

  getUserByEmail(email, async (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur interne du serveur");
    }

    if (!user) {
      return res
        .status(401)
        .json({ error: "Aucun utilisateur trouvé avec cet email." });
    }

    try {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const secret = new TextEncoder().encode(JWT_SECRET);
        const token = await new jose.SignJWT({ memberId: user.member_id })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("4h")
          .sign(secret);

        return res.json({ memberName: user.memberName, token });
      } else {
        return res.status(401).json({ error: "Mot de passe incorrect." });
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du mot de passe:", error);
      return res
        .status(500)
        .send(
          "Erreur interne du serveur lors de la vérification du mot de passe."
        );
    }
  });
});
// app.post("/login", (req, res) => {
//   // try {
//   console.log("Requête de connexion reçue");

//   const { email, password } = req.body;
//   // console.log("Email reçu :", email); // Affichez l'email reçu dans la console
//   // console.log("Mot de passe reçu :", password);
//   console.log(req.body);
//   getUserByEmail(email, (err, user) => {
//     console.log(user);
//     bcrypt.compare(password, user.password, async (err, isMatch) => {
//       // if (err || !isMatch) {
//       //   return res.status(400).json({ error: "Incorrect password" });
//       // }

//       const secret = new TextEncoder().encode(JWT_SECRET);
//       // Générez un JWT
//       const token = await new jose.SignJWT({ memberId: user.member_id })
//         .setProtectedHeader({ alg: 'HS256' })
//         .setExpirationTime('4h')
//         .sign(secret)

//       return res.json({ memberName: user.memberName, token });
//     });
//   });

// if (err || !user) {
//   return res.status(400).json({ error: 'User not found' });
// }

// Comparez le mot de passe envoyé avec le mot de passe haché dans la base de données
// } catch (error) {
//   console.error("Erreur lors de la demande de connexion :", error);
//   return res.status(500).json({ error: "Erreur serveur" });
// }
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/members/:id", (req, res) => {
  const memberId = req.params.id; // Récupérez l'ID du membre à partir de la route

  // Utilisez l'ID pour interagir avec votre base de données et obtenir les informations du membre
  // Par exemple, vous pouvez utiliser la fonction getUserById que vous avez définie précédemment

  getUserById(memberId, (err, user) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des données du membre :",
        err
      );
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

app.put("/members/:id", (req, res) => {
  const member_id = req.params.id;
  const memberName = req.body.memberName;
  const email = req.body.email;
  console.log(
    "memberId, memberName, email",
    req.body,
    member_id,
    memberName,
    email
  );
  // if (req.user.member_id !== Number(member_id)) {
  //   return res.status(401).send(err);
  // }

  const query =
    "UPDATE member SET memberName = ?, email = ? WHERE member_id = ?";

  connection.query(query, [memberName, email, member_id], (err, result) => {
    if (err) {
      console.error(
        "Erreur lors de la mise à jour des données du membre:",
        err
      );
      res.status(500).send(err);
      return;
    }

    if (result.affectedRows > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send(err);
    }
  });
});
// app.put("/members/:id", authenticateJWT, (req, res) => {
//   const memberId = req.params.id;
//   const { memberName, email } = req.body;

//   const query = "UPDATE member SET memberName = ?, email = ? WHERE member_id = ?";

//   connection.query(query, [memberName, email, memberId], (err, result) => {
//     if (err) {
//       console.error("Erreur lors de la mise à jour des données du membre:", err);
//       res.status(500).send("Erreur interne du serveur");
//       return;
//     }

//     if (result.affectedRows > 0) {
//       res.status(200).send('Profil mis à jour avec succès');
//     } else {
//       res.status(404).send('Membre non trouvé');
//     }
//   });
// });

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
      res.status(500).send(err);
      return;
    }

    if (results.length > 0) {
      res.json(results[0]); // renvoyer le premier résultat (puisqu'il devrait y avoir un seul enregistrement correspondant)
    } else {
      res.status(404).send(err);
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
      console.error(
        "Erreur lors de la récupération des données du membre :",
        err
      );
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

// Supposons que SECRET_KEY est votre clé secrète utilisée pour signer le JWT
const SECRET_KEY = "sneakyDate";

async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );

    console.log(payload); // payload contient les revendications (claims) du JWT

    return payload; // Retournez le payload (contenu du token) si la vérification est un succès
  } catch (error) {
    console.error(error);
    throw new Error("Token verification failed"); // Gérez l'erreur comme bon vous semble
  }
}

export { verifyToken };

app.post("/change-password", async (req, res) => {
  const { oldPassword, newPassword, memberId } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).send("Old and new password must be provided");
  }

  const member_id = req.body.memberId; // Vous devez ajouter l'ID du membre dans le payload JWT lors de la connexion
  
  getUserById(member_id, (err, user) => {
    if (err || !user) {
      return res.status(400).send("User not found");
    }

    console.log(user, "user change password");

    bcrypt.compare(oldPassword, user[0].password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(403).send("Old password does not match");
      }

      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).send("Error hashing the new password");
        }

        const query = "UPDATE member SET password = ? WHERE member_id = ?";
        connection.query(query, [hashedPassword, member_id], (err, result) => {
          if (err) {
            return res.status(500).send("Error updating password");
          }
          res.status(200).send({res: "Password updated successfully"});
        });
      });
    });
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
