import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string;
  password: string;
  message: ['Erreur lors de la connexion'];

  constructor() { }

  login() {
    // Logique pour authentifier l'utilisateur
  }
}
