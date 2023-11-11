import { Component, OnInit } from "@angular/core";
import { theDate } from "../../models/thedate.models";

@Component({
  selector: "app-planning",
  templateUrl: "./planning.component.html",
  styleUrls: ["./planning.component.scss"],
})
export class PlanningComponent implements OnInit {
  dateList: theDate[] = [];

  ngOnInit() {
    this.generatePlanning();
  }

  generatePlanning() {
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setMonth(endDate.getMonth() + 2); // Ajoute deux mois à la date actuelle
    endDate.setDate(0); // Ajuste au dernier jour du mois précédent (c'est-à-dire le dernier jour du 2ème mois)

    while (currentDate <= endDate) {
      let id = this.calculateDayOfYear(currentDate);
      let imgId = id % 45 === 0 ? 45 : id % 45;
      let img = "assets/car-pics/" + imgId + ".png";

      this.dateList.push({
        id,
        date: new Date(currentDate).toLocaleDateString(),
        img,
        rdvName: "Nom du RDV",
        orga: "Organisateur",
        guestList: ["Liste des invités"],
        statut: "FULL/OPEN",
        askToParticipate: "Envoie une demande à l'organisateur",
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(this.dateList);
  }

  // Cette fonction calcule le jour de l'année pour une date donnée (par exemple, le 10 janvier renverrait 10)
  calculateDayOfYear(date: Date): number {
    const startYear = date.getFullYear();
    const startOfYear = new Date(startYear, 0, 1);
    const difference = date.getTime() - startOfYear.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  }
}

// import { Component, OnInit } from "@angular/core";
// import { theDate } from "../models/thedate.models";
// import { Router } from '@angular/router';

// @Component({
//   selector: "app-planning",
//   templateUrl: "./planning.component.html",
//   styles: [],
// })
// export class PlanningComponent implements OnInit {
//   dateList: theDate[] = [];

//   ngOnInit() {
//     this.generatePlanning();
//   }

//   generatePlanning() {
//     const currentDate = new Date();
//     const endDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() + 45
//     );
//     let id = 0;

//     while (currentDate <= endDate) {
//       id++;
//       let img = 'assets/car-pics/' + id + '.png';

//       this.dateList.push({
//         id,
//         date: new Date(currentDate).toLocaleDateString(),
//         img,
//         rdvName: 'Nom du RDV',
//         orga: 'Organisateur',
//         guessList: 'Liste des invités',
//         participantsList: 'Liste des participants',
//         statut: 'FULL/OPEN',
//         askToParticipate: "Envoie une demande à l'organisateur",
//       });
//       currentDate.setDate(currentDate.getDate() + 1);
//     }
//     console.log(this.dateList);
//   }
// }

//     RdvName: string;
//     orga: string;
//     guessList: string;
//     staut: boolean;
//     askToParticipate: boolean
