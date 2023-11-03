import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, of, throwError } from "rxjs"; // Importez throwError
import { Observable } from "rxjs";
import { JwtService } from "../services/jwt.service";
import { response } from "express";
import { Router } from "@angular/router";
import { USER_KEY } from "../consts/storagekeys.const";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:3000";
  private authToken: string | null = null;
  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject (!!sessionStorage.getItem(USER_KEY));

  // Méthode pour définir le token (vous pouvez appeler cette méthode après l'authentification)
  setToken(token: string) {
    this.authToken = token;
  }

  // Méthode pour récupérer le token
  getToken(): string | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      const userData = JSON.parse(user);
      return userData.token;
    }
    return null;
  }

  constructor(
    private http: HttpClient,
    // private jwtService: JwtService,
    private router: Router
  ) {}

  // login(email: string, password: string) {
  //   // Envoyez les données au serveur via une requête POST
  //   const self = this;
  //   const loginData = {email, password};
  //   this.http.post("http://localhost:3000/login", loginData).subscribe({
  //     next(response) {
  //       console.log("Après l'appel HTTP avec succès", response);
  //       const jsonToString = JSON.stringify(response);
  //       window.sessionStorage.setItem('user', jsonToString);
  //     },
  //     error(err) 
  //       console.log("Après l'appel HTTP avec erreur", err);
  //     },
  //     complete() {
  //       console.log("loggin complete");
  //       self.router.navigate(['profil/:pseudonyme']);
  //     },
  //   });
  // }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    // Retournez l'observable créé autour de la requête HTTP POST
    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/login`, loginData).subscribe({
        next(response) {
          console.log("Après l'appel HTTP avec succès", response);
          const jsonToString = JSON.stringify(response);
          window.sessionStorage.setItem("user", jsonToString);
          // Émettez la réponse dans l'observable pour que les composants puissent la recevoir
          observer.next(response);
          observer.complete(); // Indiquez que l'observable est terminé
        },
        error(err) {
          console.log("Après l'appel HTTP avec erreur", err);
          // Émettez l'erreur dans l'observable
          observer.error(err);
          observer.complete(); // Indiquez que l'observable est terminé
        },
      });
    });
  }

  checkIsLogged(): BehaviorSubject<boolean> {
    const isLogged = new BehaviorSubject(!!window.sessionStorage.getItem(USER_KEY));
    return isLogged;
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
    let errorMessage = "Une erreur s'est produite lors de la demande HTTP.";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage); // Propagez l'erreur
  }

  // Méthode ajoutée pour décoder le JWT et obtenir l'ID utilisateur
  // getUserIdFromToken(): number | null {
  //   const token = sessionStorage.getItem('token');
  //   if (!token) return null;

  //   // const decodedToken = jwt.decode(token);
  //   // if (typeof decodedToken === 'object' && decodedToken !== null && 'userId' in decodedToken) {
  //   //    return decodedToken['userId'];
  //   // }
  //   return null;
  // }

  getUserIdFromToken(): number | null {
    // Récupérez le token JWT depuis le stockage local (ou d'où vous le stockez)
    const token = sessionStorage.getItem(USER_KEY); // Assurez-vous d'ajuster la clé selon votre implémentation

    if (token) {
      try {
        // Parsez le token JWT pour extraire l'identifiant du membre (exemple)
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const memberId = tokenPayload.memberId; // L'attribut memberId doit être défini dans le token

        if (memberId) {
          return memberId;
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'extraction de l'identifiant du membre à partir du token:",
          error
        );
      }
    }

    return null; // Retournez null si le token est invalide ou s'il n'y a pas d'identifiant du membre
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
