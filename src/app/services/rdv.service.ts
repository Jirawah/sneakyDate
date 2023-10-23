import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RdvService {
  private apiBaseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getRdvsForDate(dateId: string): Observable<any[]> {
    const url = `${this.apiBaseUrl}/rdvs?dateId=${dateId}`;
    return this.http.get<any[]>(url);
  }

  createRdv(rdvData: any) {
    return this.http.post(`${this.apiBaseUrl}/api/rdv`, rdvData);
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
