import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { jwtVerify } from "jose";
import { MyTokenPayload } from "../interfaces/jwt-payload";

@Injectable({
  providedIn: "root",
})
export class JwtService {
  // Vous aurez besoin de la clé secrète ou de la clé publique/privée correspondant à celle utilisée pour signer vos JWTs
  private readonly secretKey = "sneakyDate";

  constructor() {}

  // Cette méthode devrait retourner une promesse de MyTokenPayload
  async verifyToken(token: string): Promise<MyTokenPayload> {
    try {
      // Vérifiez le token et récupérez le résultat de la vérification
      const key = new TextEncoder().encode(this.secretKey);
      const { payload } = await jwtVerify(token, key);

      // Convertissez le payload en MyTokenPayload en utilisant une assertion de type double
      return payload as unknown as MyTokenPayload;
    } catch (error) {
      console.error("Erreur de vérification du token JWT:", error);
      throw error;
    }
  }
}

// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class JwtService {

//   private apiUrl = 'http://localhost:3000'; // Votre URL de base d'API

//   constructor(private http: HttpClient) {}

//   // Appelez cette fonction pour vérifier le token côté client
//   verifyToken(token: string): Observable<any> {
//     const headers = { 'Authorization': 'Bearer ' + token };
//     return this.http.get(`${this.apiUrl}/path-to-verify-token-route`, { headers });
//   }
// }
