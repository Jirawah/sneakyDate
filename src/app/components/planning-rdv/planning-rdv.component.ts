import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RdvService } from '../../services/rdv.service';
import { CardboxService } from '../../services/cardbox.service'; // Assurez-vous d'importer le bon chemin

@Component({
  selector: 'app-planning-rdv',
  templateUrl: './planning-rdv.component.html',
  styleUrls: ['./planning-rdv.component.scss']
})

export class PlanningRdvComponent implements OnInit {

  cardboxId: number;
  id: string;
  displayDate: string = '';  // Pour stocker et afficher la date récupérée
  rdv: any = {
    rdvName: '',
    orga: '',
    guestList: [],
    statut: ''
  };

  constructor(
    private route: ActivatedRoute,
    private rdvService: RdvService,
    private router: Router,
    private cardboxService: CardboxService  // Injectez le service ici
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.id = data.get("id") as string;

      this.cardboxId = +this.id; 

      // Récupérez la date à partir du service Cardbox
      const cardboxId = +this.id;
      this.cardboxService.getDateByCardboxId(cardboxId).subscribe(response => {
        this.displayDate = response.date;
      }, error => {
        console.error('Erreur lors de la récupération de la date:', error);
      }); // Adaptez selon la structure de votre réponse
    });
  };


  private generateCardboxIdForToday(): number {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1); // 1er janvier de l'année en cours
    const today = new Date();
    const differenceInDays = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    return differenceInDays + 1; // Car on compte à partir du 1er janvier
  }

  onSubmit() {
    console.log('Cardbox ID:', this.cardboxId);

    // Récupérer l'ID utilisateur à partir du token.
    // const userId = this.authService.getUserIdFromToken();

    // // Vérifier si l'ID utilisateur a été trouvé.
    // if (userId !== null) {
    //   this.rdv.member_id = userId;

    //   const rdvDataToSend = {
    //     ...this.rdv,
    //     cardbox_id: this.cardboxId
    //   };

    //   this.rdvService.createRdv(rdvDataToSend).subscribe(response => {
    //     this.router.navigate([`/planning-infos/${this.id}`]);
    //   }, error => {
    //     console.error('Erreur lors de la création du RDV:', error);
    //   });

    // } else {
    //   console.error("L'utilisateur n'est pas connecté ou l'ID utilisateur est introuvable dans le token.");
    // }
  }
}
//   onSubmit() {
//     console.log('Cardbox ID:', this.cardboxId);

//     const rdvDataToSend = {
//       ...this.rdv,
//       cardbox_id: this.cardboxId,
//       member_id: 10  // Utilisation d'un member_id fictif
//     };

//     this.rdvService.createRdv(rdvDataToSend).subscribe(response => {
//         this.router.navigate([`/planning-infos/${this.id}`]);
//     }, error => {
//         console.error('Erreur lors de la création du RDV:', error);
//     });
//   }
// }


















//   onSubmit() {
//     console.log('Cardbox ID:', this.cardboxId);
//     const rdvDataToSend = {
//       ...this.rdv,
//       cardbox_id: this.cardboxId
//     };
  
//     this.rdvService.createRdv(rdvDataToSend).subscribe(response => {
//       this.router.navigate([`/planning-infos/${this.id}`]);
//     }, error => {
//       console.error('Erreur lors de la création du RDV:', error);
//     });
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { RdvService } from '../../services/rdv.service';

// @Component({
//   selector: 'app-planning-rdv',
//   templateUrl: './planning-rdv.component.html',
//   styleUrls: ['./planning-rdv.component.scss']
// })
// export class PlanningRdvComponent implements OnInit {

//   id: string;
//   rdv: any = {
//     rdvName: '',
//     orga: '',
//     guestList: [],
//     statut: ''
//   };

//   constructor(private route: ActivatedRoute, private rdvService: RdvService, private router: Router) { }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(data => {
//       this.id = data.get("id") as string;
//     });
//   }

//   onSubmit() {
//     this.rdvService.createRdv(this.rdv).subscribe(response => {
//       this.router.navigate([`/planning-infos/${this.id}`]);
//     }, error => {
//       console.error('Erreur lors de la création du RDV:', error);
//     });
//   }
// }





// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { RdvService } from '../services/rdv.service';

// @Component({
//   selector: 'app-planning-rdv',
//   templateUrl: './planning-rdv.component.html',
//   styleUrls: ['./planning-rdv.component.scss']
// })
// export class PlanningRdvComponent implements OnInit {

//   id: string;
//   rdv: any = {
//     rdvName: '',
//     orga: '',
//     guestList: [],
//     statut: ''
//   };

//   constructor(private route: ActivatedRoute, private rdvService: RdvService, private router: Router) { }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(data => {
//       this.id = data.get("id") as string;
//     });
//   }

//   onSubmit() {
//     // this.rdvService.createRdv(this.rdv).subscribe(response => {
//     //   this.router.navigate([`/planning-infos/${this.id}`]);
//     // }, error => any {
//     //   console.error('Erreur lors de la création du RDV:', error);
//     // });
//     console.log('hello')
//   }
// }
