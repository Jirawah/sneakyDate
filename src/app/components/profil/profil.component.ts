import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../../services/profil.service";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { USER_KEY } from "src/app/consts/storagekeys.const";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.scss"],
})
export class ProfilComponent implements OnInit {
  memberName: string;
  email: string;
  oldPassword: string;
  newPassword: string;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Utilisez le service d'authentification pour obtenir les informations du membre actuellement connecté
    const memberId = this.getMemberIdFromToken();
    console.log("Member ID from token:", memberId);
    if (memberId) {
      this.loadMemberInfo(memberId);
    }
  }

  loadMemberInfo(memberId: number) {
    this.profileService.getMemberInfo(memberId).subscribe((data) => {
      this.memberName = data.memberName;
      this.email = data.email;
      console.log("Member data:", data); // Ajout d'un console.log pour vérifier les données du membre
    });
  }

  // Vous pouvez ajouter cette méthode pour obtenir l'identifiant du membre depuis le token
  private getMemberIdFromToken(): number | null {
    // Obtenez le token depuis votre service d'authentification
    const token = this.authService.getToken(); // Assurez-vous d'implémenter cette méthode dans AuthService
    console.log("JWT token:", token); // Ajout d'un console.log pour vérifier le token JWT

    if (token) {
      try {
        // Parsez le token JWT pour extraire l'identifiant du membre (exemple)
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const memberId = tokenPayload.memberId; // L'attribut memberId doit être défini dans le token
        console.log("Member ID from token payload:", memberId); // Ajout d'un console.log pour vérifier l'ID du membre extrait du token

        if (memberId !== undefined) {
          return memberId;
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'extraction de l'identifiant du membre à partir du token:",
          error
        );
      }
    }

    return null; // Retournez null si le token est invalide ou s'il n'y a pas d'identifiant du membre
  }

  editProfile() {
    const updatedInfo = {
      memberName: this.memberName,
      email: this.email,
      // Ajoutez d'autres champs ici si nécessaire
    };

    const memberId = this.getMemberIdFromToken();
    if (memberId) {
      this.profileService.updateMemberInfo(memberId, updatedInfo).subscribe({
        next: (res) => {
          console.log("Profil mis à jour avec succès", res);
        },
        error: (err) => {
          console.log("Erreur lors de la mise à jour du profil", err);
        },
      });
    }
  }

  changePassword() {
    console.log("initier le changement de mot de passe");
    if (!this.oldPassword || !this.newPassword) {
      console.log("Vous devez remplir tous les champs.");
    }
    
    const memberId = this.getMemberIdFromToken();
    const payload = { oldPassword: this.oldPassword, newPassword: this.newPassword, memberId };
    
    this.profileService.changePassword(payload).subscribe({
      next: (response) => {
        console.log(response);
        console.log("Mot de passe changé avec succès !");
        // Optionnel : réinitialiser les champs après changement de mot de passe
        this.oldPassword = '';
        this.newPassword = '';
      },
      error: (error) => {
        console.error("Erreur lors du changement de mot de passe:", error);
      }
    });
  }
}
