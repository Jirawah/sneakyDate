const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Configuration de la connexion à MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'votre_utilisateur',
  password: 'votre_mot_de_passe',
  database: 'votre_base_de_donnees'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL!');
});

// Routes et autres logiques peuvent être ajoutées ici

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/rdvs', (req, res) => {
    const dateId = req.query.dateId;
  
    // Requête SQL pour récupérer les RDVs basés sur le dateId
    const query = "SELECT * FROM rdvs_table WHERE dateId = ?";
    
    connection.query(query, [dateId], (err, results) => {
      if (err) {
        // Gestion d'erreur: renvoie une réponse d'erreur
        res.status(500).json({ error: 'Erreur lors de la récupération des RDVs.' });
      } else {
        // Renvoie les résultats de la requête
        res.json(results);
      }
    });
  });

  connection.end();