import { Component, OnInit } from "@angular/core";
import { MessageService } from "../../services/message.service";
import { HttpClient } from "@angular/common/http"; // Importez HttpClient
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  message: string | null = null;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient // Injectez HttpClient
  ) {}

  ngOnInit() {
    this.messageService.message$.subscribe((msg) => {
      this.message = msg;
    });
  }

  login() {
    console.log("Avant l'appel HTTP");
    this.messageService.clearMessage();

    // Vérifiez si les valeurs email et password sont définies
    if (!this.email || !this.password) {
      this.message = "Veuillez entrer l'email et le mot de passe.";
      return; // Sortez de la fonction pour éviter l'appel HTTP incorrect
    }

    this.authService.login(this.email, this.password);
     
    if (window.sessionStorage.getItem('user')) {
      this.router.navigate(['/profil']);
    }
  }
}

// .pipe(
//   catchError(error => {
//     this.message = "Erreur lors de la connexion!";
//     console.error('Erreur lors de l\'appel HTTP', error);
//     throw error; // Vous pouvez choisir de lever l'erreur à nouveau ou de la gérer ici
//   })
// )
// .subscribe(
//   (response: any) => {
//     console.log('Après l\'appel HTTP avec succès', response);
//     this.message = "Connexion réussie!";
//     // Naviguez vers la page d'accueil ou la page suivante après la connexion.
//   }
// );

//   login() {
//     console.log('Avant l\'appel HTTP');
//     this.messageService.clearMessage();

//     this.authService.login(this.email, this.password).subscribe(
//       (response) => {
//         console.log('Après l\'appel HTTP avec succès', response);
//         this.message = "Connexion réussie!";
//         // Naviguez vers la page d'accueil ou la page suivante après la connexion.
//       },
//       error => {
//         this.message = "Erreur lors de la connexion!";
//         console.error('Erreur lors de l\'appel HTTP', error);
//       }
//     );
//   }
// }

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
