import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms"; // Importez les éléments nécessaires
import { MessageService } from "../../services/message.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Déclarez loginForm de type FormGroup
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder, // Ajoutez FormBuilder au constructeur
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialisez le groupe de formulaires avec FormBuilder
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]], // Utilisez Validators pour la validation
      password: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.messageService.message$.subscribe((msg) => {
      this.loginError = msg;
    });
  }

  // Modifiez la méthode de connexion pour utiliser FormGroup
  login() {
    this.loginError = null; // Réinitialisez l'erreur de connexion
    this.messageService.clearMessage();

    // Utilisez le groupe de formulaires pour récupérer les valeurs
    const { email, password } = this.loginForm.value;

    // Maintenant, utilisez email et password au lieu de this.email et this.password
    if (this.loginForm.invalid) {
      this.loginError = "Veuillez entrer un email et un mot de passe valides.";
      return;
    }

    this.authService.login(email, password).subscribe({
      next: (response) => {
        if (response.memberName) {
          this.authService.isLogged$.next(true);
          this.router.navigate([`/profil`]);
        } else {
          this.loginError =
            "La connexion a échoué. Veuillez vérifier vos informations de connexion.";
        }
      },
      error: (err) => {
        console.error("Erreur lors de la connexion:", err);
        this.loginError = "Email ou mot de passe incorrecte";
      },
    });
  }
}
// import { Component, OnInit } from "@angular/core";
// import { MessageService } from "../../services/message.service";
// import { HttpClient } from "@angular/common/http"; // Importez HttpClient
// import { AuthService } from "src/app/services/auth.service";
// import { Router } from "@angular/router";

// @Component({
//   selector: "app-login",
//   templateUrl: "./login.component.html",
//   styleUrls: ["./login.component.scss"],
// })
// export class LoginComponent implements OnInit {
//   email: string;
//   password: string;
//   message: string | null = null;

//   constructor(
//     private messageService: MessageService,
//     private authService: AuthService,
//     private router: Router,
//     private http: HttpClient // Injectez HttpClient
//   ) {}

//   ngOnInit() {
//     this.messageService.message$.subscribe((msg) => {
//       this.message = msg;
//     });
//   }

//   login() {
//     console.log("Avant l'appel HTTP");
//     this.messageService.clearMessage();

//     // Vérifiez si les valeurs email et password sont définies
//     if (!this.email || !this.password) {
//       this.message = "Veuillez entrer l'email et le mot de passe.";
//       return; // Sortez de la fonction pour éviter l'appel HTTP incorrect
//     }

//     // Utilisez le service d'authentification pour gérer la connexion
//     this.authService.login(this.email, this.password).subscribe({
//       next: (response) => {
//         if (response.memberName) {
//           // La connexion a réussi, vous pouvez maintenant naviguer vers la page de profil
//           this.authService.isLogged$.next(true);
//           this.router.navigate(['/profil']);
//         } else {
//           // La connexion a échoué, affichez un message d'erreur si nécessaire
//           this.message = "La connexion a échoué. Veuillez vérifier vos informations de connexion.";
//         }
//       },
//       error: (err) => {
//         // Gérer l'erreur ici
//         console.error('Erreur lors de la connexion:', err);
//         // Affichez un message d'erreur à l'utilisateur ou effectuez d'autres actions
//       },
//       complete: () => {
//         // Code à exécuter lorsque l'observable est terminé (peut être laissé vide)
//       }
//     });
//   }
// }

//   login() {
//     console.log("Avant l'appel HTTP");
//     this.messageService.clearMessage();

//     // Vérifiez si les valeurs email et password sont définies
//     if (!this.email || !this.password) {
//       this.message = "Veuillez entrer l'email et le mot de passe.";
//       return; // Sortez de la fonction pour éviter l'appel HTTP incorrect
//     }

//     // Utilisez le service d'authentification pour gérer la connexion
//     this.authService.login(this.email, this.password).subscribe((response) => {
//       if (response.memberName) {
//         // La connexion a réussi, vous pouvez maintenant naviguer vers la page de profil
//         this.router.navigate(['/profil', response.memberName]);
//       } else {
//         // La connexion a échoué, affichez un message d'erreur si nécessaire
//         this.message = "La connexion a échoué. Veuillez vérifier vos informations de connexion.";
//       }
//     });
//   }
// }

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
