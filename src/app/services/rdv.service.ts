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

  getRdvsForDate(id: string): Observable<IRdv[]> {
    console.log(id);
    const url = `${this.apiBaseUrl}/rdvs/${id}`;
    // eturn this.http.get(`${this.BASE_URL}/cardbox/${cardbox_id}`);
    return this.http.get<IRdv[]>(url);
  }

  createRdv(rdvData: IRdv): Observable<void> {
    return this.http.post<void>(`${this.apiBaseUrl}/api/rdv`, rdvData);
  }
}
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
