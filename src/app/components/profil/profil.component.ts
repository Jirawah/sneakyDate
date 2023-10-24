import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  memberName: string;
  email: string;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    // Chargez les informations du membre depuis le service
    this.loadMemberInfo();
  }

  loadMemberInfo() {
    this.profileService.getMemberInfo().subscribe((data) => {
      this.memberName = data.memberName;
      this.email = data.email;
    });
  }

  editProfile() {
    // Redirigez l'utilisateur vers la page de modification de profil
    // Vous devrez configurer la route correspondante dans app-routing.module.ts
  }
}