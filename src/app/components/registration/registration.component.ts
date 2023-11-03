import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "../../services/message.service";
import { RegistrationService } from "../../services/registration.service";

@Component({
  selector: "app-register",
  templateUrl: "./registration.component.html",
  styleUrls: [],
})
export class RegistrationComponent {
  memberName: string;
  email: string;
  password: string;
  confirmPassword: string;
  errorMessage: string = "";
  message: ["Erreur lors de la connexion"];

  constructor(
    private registrationService: RegistrationService,
    private router: Router, // Injecté le service Router
    private messageService: MessageService // Injecté le nouveau service MessageService
  ) {}

  checkPassword(): boolean {
    console.log(this.password, this.confirmPassword);
    return this.password === this.confirmPassword;
  }

  register() {
    if (this.checkPassword()) {
      this.registrationService
        .registerUser(this.memberName, this.email, this.password)
        .subscribe({
          next: () => {
            console.log("Compte créé avec succès");
            this.messageService.setMessage("Compte créé avec succès");
            this.router.navigate(["/login"]);
          },
          error: (error) => {
            console.error("Erreur lors de la création du compte", error);
            if (error.error && error.error.error) {
              switch (error.error.error) {
                case "Email already in use":
                  this.errorMessage = "L'email est déjà utilisé.";
                  break;
                case "Username already in use":
                  this.errorMessage = "Le pseudonyme est déjà utilisé.";
                  break;
                default:
                  this.errorMessage =
                    "Erreur inconnue lors de l'enregistrement. Veuillez réessayer.";
              }
            } else {
              this.errorMessage =
                "Erreur lors de la création du compte. Veuillez réessayer.";
            }
          },
        });
      } else {
        this.errorMessage = "les mots de passe ne sont pas identiques"
      }
  }
}
//   register() {
//     this.registrationService.registerUser(this.memberName, this.email, this.password).subscribe(
//       response => {
//         console.log('Compte créé avec succès');
//         this.messageService.setMessage('Compte créé avec succès');
//         this.router.navigate(['/login']); // Redirige l'utilisateur vers la page de connexion
//       },
//       error => {
//         console.error('Erreur lors de la création du compte', error);
//         // Gérez l'erreur comme vous le souhaitez
//       }
//     );
//   }
// }

// import { Component } from '@angular/core';
// import { RegistrationService } from '../services/registration.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './registration.component.html',
//   styleUrls: []
// })
// export class RegistrationComponent {

//   memberName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   message: ['Erreur lors de la connexion'];

//   constructor(private registrationService: RegistrationService) { }

//   register() {
//       this.registrationService.registerUser(this.memberName, this.email, this.password).subscribe(
//         response => {
//           console.log('Compte créé avec succès');
//           // Traitez la réponse comme vous le souhaitez
//         },
//         error => {
//           console.error('Erreur lors de la création du compte', error);
//           // Gérez l'erreur comme vous le souhaitez
//         }
//       );
//     }
//   }

//   this.registrationService.registerUser(this.memberName, this.email, this.password).subscribe({
//     next: (response) => {
//       console.log('Compte créé avec succès');
//       // Traitez la réponse comme vous le souhaitez
//     },
//     error: (error) => {
//       console.error('Erreur lors de la création du compte', error);
//       // Gérez l'erreur comme vous le souhaitez
//     }
//   });
// }
