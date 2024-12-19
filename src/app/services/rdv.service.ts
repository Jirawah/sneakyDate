import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IRdv } from "../interfaces/rdv.interface";

@Injectable({
  providedIn: "root",
})
export class RdvService {
  private apiBaseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  // ... vos autres méthodes ...
  getRdvsForDate(id: string): Observable<IRdv[]> {
    console.log(id);
    const url = `${this.apiBaseUrl}/rdvs/${id}`;
    // eturn this.http.get(`${this.BASE_URL}/cardbox/${cardbox_id}`);
    return this.http.get<IRdv[]>(url);
  }

  // createRdv(rdvData: IRdv): Observable<void> {
  //   // Récupérer le token du sessionStorage
  //   const userToken = sessionStorage.getItem("user"); // Remplacez 'userToken' par la clé réelle que vous utilisez
  //   // Décoder le payload du token pour récupérer l'ID utilisateur
  //   if (userToken) {
  //     const tokenPayload = JSON.parse(atob(userToken.split('.')[1]));
  //     rdvData.member_id = tokenPayload.memberId; // Assurez-vous que le champ 'member_id' est attendu dans votre backend

  //     return this.http.post<void>(`${this.apiBaseUrl}/api/rdv`, rdvData);
  //   } else {
  //     // Gérer l'absence de token, par exemple en renvoyant un Observable qui envoie une erreur
  //     // Vous pourriez aussi retourner un message d'erreur ou rediriger l'utilisateur vers la page de connexion
  //     throw new Error('No token found in sessionStorage');
  //   }
  // }
  createRdv(rdvData: IRdv): Observable<void> {
    const userToken = sessionStorage.getItem("user");
    if (userToken) {
      const tokenPayload = JSON.parse(atob(userToken.split('.')[1]));
      const extendedRdvData = {
        ...rdvData,
        member_id: tokenPayload.memberId, // Ajoutez l'ID de l'utilisateur ici
      };
  
      return this.http.post<void>(`${this.apiBaseUrl}/api/rdv`, extendedRdvData);
    } else {
      throw new Error('No token found in sessionStorage');
    }
  }
}
// @Injectable({
//   providedIn: "root",
// })
// export class RdvService {
//   private apiBaseUrl = "http://localhost:3000";

//   constructor(private http: HttpClient) {}

// getRdvsForDate(id: string): Observable<IRdv[]> {
//   console.log(id);
//   const url = `${this.apiBaseUrl}/rdvs/${id}`;
//   // eturn this.http.get(`${this.BASE_URL}/cardbox/${cardbox_id}`);
//   return this.http.get<IRdv[]>(url);
// }

//   createRdv(rdvData: IRdv): Observable<void> {
//     return this.http.post<void>(`${this.apiBaseUrl}/api/rdv`, rdvData);
//   }
// }







// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RdvService {
//   private apiBaseUrl = 'http://localhost:4200/';

//   constructor(private http: HttpClient) { }

//   getRdvsForDate(dateId: string): Observable<any[]> {
//     const url = `${this.apiBaseUrl}/rdvs?dateId=${dateId}`;
//     return this.http.get<any[]>(url);
//   }
// }
