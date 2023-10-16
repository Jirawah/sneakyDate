import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  // <-- Ajoutez cette ligne pour importer Observable

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseURL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  registerUser(memberName: string, email: string, password: string): Observable<any> {  // <-- Ajoutez le type de retour ici
    const body = { memberName, email, password };
    return this.httpClient.post<any>(`${this.baseURL}/register`, body);  // <--- Nous indiquons également que .post() renvoie un type 'any' pour l'instant.
  }
}














// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class RegistrationService {

//   private baseURL = 'http://localhost:3000';

//   constructor(private httpClient: HttpClient) { }

//   registerUser(memberName:string, email: string, password: string) {
//     const body = { memberName, email, password };
//     return this.httpClient.post(`${this.baseURL}/register`, body);
//   }
// }