import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken-esm';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  // Clé secrète pour la signature du jeton JWT
  private secretKey = 'sneakyDate'; // Remplacez par votre clé secrète

  // Fonction pour générer un jeton JWT en fonction des données spécifiques de votre application
  generateToken(data: any): string {
    // Logique pour générer le jeton JWT en utilisant jsonwebtoken-esm
    const token = jwt.sign(data, this.secretKey, { expiresIn: '1h' });
    // Assurez-vous de remplacer 'your-secret-key' par votre clé secrète appropriée

    // Retournez le jeton généré
    return token;
  }

  // Autres fonctions pour la validation, la vérification, la vérification d'expiration, etc., si nécessaire
}
