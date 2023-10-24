import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs'; // Importez throwError
import { JwtService } from '../services/jwt.service';
import { response } from 'express';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    // private jwtService: JwtService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    // Envoyez les données au serveur via une requête POST
    const loginData = {email, password};
    this.http.post("http://localhost:3000/login", loginData).subscribe({
      next(response) {
        console.log("Après l'appel HTTP avec succès", response);
        const jsonToString = JSON.stringify(response);
        window.sessionStorage.setItem('user', jsonToString);
      },
      error(err) {
        console.log("Après l'appel HTTP avec erreur", err);
      },
      complete() {
        console.log("loggin complete");
      },
    });
  }
    // console.log('Appel HTTP pour la connexion');
    // return this.http.post(`${this.apiUrl}/login`, { email, password })
    //   .pipe(
    //     catchError(this.handleError), // Gérez les erreurs HTTP
    //     tap((response: any) => {
    //       console.log('Réponse du serveur après connexion', response);
    //       // const token = this.jwtService.generateToken({ userId: response.userId });
    //       // localStorage.setItem('token', token);
    //     })
    //   );
  

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur s\'est produite lors de la demande HTTP.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage); // Propagez l'erreur
  }

  // Méthode ajoutée pour décoder le JWT et obtenir l'ID utilisateur
  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    // const decodedToken = jwt.decode(token);
    // if (typeof decodedToken === 'object' && decodedToken !== null && 'userId' in decodedToken) {
    //    return decodedToken['userId'];
    // }
    return null;
  }
}



// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
// import * as jwt from 'jsonwebtoken-esm';  // Importez la bibliothèque jsonwebtoken
// import { JwtService } from '../services/jwt.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
  
//   private apiUrl = 'http://localhost:3000'; // Remplacez par l'URL de votre API
  
//   constructor(
//     private http: HttpClient,
//     private jwtService: JwtService
//     ) {}

//   login(email: string, password: string) {
//     console.log('Appel HTTP pour la connexion');
//     return this.http.post(`${this.apiUrl}/login`, { email, password })
//       .pipe(
//         tap((response: any) => {
//           console.log('Réponse du serveur après connexion', response);
//           const token = this.jwtService.generateToken({ userId: response.userId });
//           localStorage.setItem('token', token);
//         })
//       );
//   }

//   // Méthode ajoutée pour décoder le JWT et obtenir l'ID utilisateur
//   getUserIdFromToken(): number | null {
//     const token = localStorage.getItem('token');
//     if (!token) return null;

//     const decodedToken = jwt.decode(token);
//     if (typeof decodedToken === 'object' && decodedToken !== null && 'userId' in decodedToken) {
//        return decodedToken['userId'];
//     }
//     return null;
//   }
// }






// // auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
  
//   private apiUrl = 'http://localhost:3000'; // Remplacez par l'URL de votre API
  
//   constructor(private http: HttpClient) {}

//   login(email: string, password: string) {
//     return this.http.post(`${this.apiUrl}/login`, { email, password })
//       .pipe(
//         tap((response: any) => {
//           localStorage.setItem('token', response.token);
//         })
//       );
//   }
// }