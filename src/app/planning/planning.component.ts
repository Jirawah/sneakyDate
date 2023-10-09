import { Component, OnInit } from "@angular/core";
import { theDate } from "../models/thedate.models";
import { Router } from '@angular/router';




@Component({
  selector: "app-planning",
  templateUrl: "./planning.component.html",
  styles: [],
})
export class PlanningComponent implements OnInit {
  dateList: theDate[] = [];

  ngOnInit() {
    this.generatePlanning();
  }

  generatePlanning() {
    const currentDate = new Date();
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 45
    );
    let id = 0;

    while (currentDate <= endDate) {
      id++;
      let img = 'assets/car-pics/' + id + '.png';

      this.dateList.push({
        id,
        date: new Date(currentDate).toLocaleDateString(),
        img,
        rdvName: 'Nom du RDV',
        orga: 'Organisateur',
        guessList: 'Liste des invités',
        participantsList: 'Liste des participants',
        statut: 'FULL/OPEN',
        askToParticipate: "Envoie une demande à l'organisateur",
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(this.dateList);
  }
}

//     RdvName: string;
//     orga: string;
//     guessList: string;
//     staut: boolean;
//     askToParticipate: boolean