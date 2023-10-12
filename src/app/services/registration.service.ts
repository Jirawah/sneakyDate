import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseURL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  registerUser(memberName:string, email: string, password: string) {
    const body = { memberName, email, password };
    return this.httpClient.post(`${this.baseURL}/register`, body);
  }
}