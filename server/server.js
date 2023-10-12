import express from 'express';
import session from 'express-session'; 
//import passport from 'passport' ;
import bodyParser from 'body-parser' ;
import cors from 'cors' ;
import mysql from 'mysql2' ;
import bcrypt from 'bcrypt' ;
//import initializePassport from './passport-config' ;



const app = express();
const PORT = 3000;

app.use(cors());
// Parse JSON requests
app.use(bodyParser.json());

// Configuration de la connexion à MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sneakydate',
  port: 3306
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL!');
});

const getUserByEmail = (email, callback) => {
  const query = "SELECT * FROM member WHERE email = ?";
  
  connection.query(query, [email], (err, results) => {
    if (err) return callback(err, null);
    return results.length ? callback(null, results[0]) : callback(null, null);
  });
};

const getUserById = (id, callback) => {
  const query = "SELECT * FROM Member WHERE member_id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    return results.length ? callback(null, results[0]) : callback(null, null);
  });
};

// initializePassport(passport, getUserByEmail, getUserById);

// app.use(passport.initialize());
// app.use(passport.session());

app.use(session({
  secret: 'secret', // Changez ceci à une clé secrète unique
  resave: false,
  saveUninitialized: false
}));

app.get('/rdvs', (req, res) => {
  const dateId = req.query.dateId;
  console.log(dateId);
  const query = "SELECT * FROM 'rdv' WHERE cardbox_id = ?";
  connection.query(query, dateId, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des RDVs.' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/rdv', (req, res) => {
  const { rdvName, orga, guestList, statut } = req.body;
  const member_id = 1;
  const query = `INSERT INTO RDV (rdvName, orga, statut, member_id) VALUES (?, ?, ?, ?)`;
  connection.query(query, [rdvName, orga, statut, member_id], (err, result) => {
    if (err) {
      res.status(500).send('Error saving RDV to database');
    } else {
      res.status(200).send('RDV created successfully');
    }
  });
});

// Route d'inscription
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash le mot de passe

        const query = "INSERT INTO member (memberName, email, password) VALUES (?, ?)";
        connection.query(query, [memberName, email, hashedPassword], (err, result) => {
            if (err) {
                res.status(500).send('Erreur lors de la création du compte');
            } else {
                res.status(200).send('Compte créé avec succès');
            }
        });
    } catch {
        res.status(500).send('Erreur serveur');
    }
});

app.get('/members', (req, res) => {
  connection.query('SELECT * FROM member', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
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