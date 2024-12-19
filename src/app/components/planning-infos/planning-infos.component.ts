import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RdvService } from "../../services/rdv.service";
import { CardboxService } from "../../services/cardbox.service";
import { IRdv } from "src/app/interfaces/rdv.interface";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-planning-infos",
  templateUrl: "./planning-infos.component.html",
  styleUrls: ["./planning-infos.component.scss"],
})
export class PlanningInfosComponent implements OnInit {
  dataSource$: Observable<IRdv[]> = of([
    {
      id: "ERRORDB",
      rdvName: "ERRORDB",
      orga: "ERRORDB",
      guessList: ["invités"],
      statut: "open",
      askToParticipate: "string",
    },
  ]);
  displayedColumns: string[] = [
    "id",
    "rdvName",
    "orga",
    "guessList",
    "statut",
    "askToParticipate",
  ];
  maxGuestLimit = 15;
  id: string;
  displayDate: string = "";

  constructor(
    private route: ActivatedRoute,
    private rdvService: RdvService,
    private cardboxService: CardboxService
    ) {}

  // ngOnInit() {
  //   this.route.paramMap.subscribe((data) => {
  //     this.id = data.get("id") as string;

  //     console.log("id", this.id);

  //     // Utilisez ici le service pour obtenir les données
  //     this.dataSource$ = this.rdvService.getRdvsForDate(this.id);
  //   });
  // }
  ngOnInit() {
    this.route.paramMap.subscribe((data) => {
      this.id = data.get("id") as string;
      console.log("id", this.id);

      // Utilisez ici le service pour obtenir les données des RDVs
      this.dataSource$ = this.rdvService.getRdvsForDate(this.id);

      // Utilisez CardboxService pour obtenir la date
      const cardboxId = parseInt(this.id, 10); // Convertissez l'ID en nombre
      this.cardboxService.getDateByCardboxId(cardboxId).subscribe({
        next: (response) => {
          this.displayDate = response.date; // Assurez-vous que 'response.date' est dans le format correct
        },
        error: (err) => {
          console.error("Erreur lors de la récupération de la date:", err);
        },
      });
    });
  }
}
