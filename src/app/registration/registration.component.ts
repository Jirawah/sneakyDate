import { Component } from '@angular/core';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: []
})
export class RegistrationComponent {

  memberName: string;
  email: string;
  password: string;
  confirmPassword: string;
  message: ['Erreur lors de la connexion'];

  constructor(private registrationService: RegistrationService) { }

  register() {
      this.registrationService.registerUser(this.memberName, this.email, this.password).subscribe(
        response => {
          console.log('Compte créé avec succès');
          // Traitez la réponse comme vous le souhaitez
        },
        error => {
          console.error('Erreur lors de la création du compte', error);
          // Gérez l'erreur comme vous le souhaitez
        }
      );
    }
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
}