import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string;
  password: string;
  message: string | null = null;

  constructor(private messageService: MessageService) {
    this.messageService.message$.subscribe(msg => {
      this.message = msg;
    });
  }

  login() {
    this.messageService.clearMessage(); // Assurez-vous que le message est effacé lors de la tentative de connexion.
    // Logique pour authentifier l'utilisateur
  }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {

//   email: string;
//   password: string;
//   message: ['Erreur lors de la connexion'];

//   constructor() { }

//   login() {
//     // Logique pour authentifier l'utilisateur
//   }
// }
