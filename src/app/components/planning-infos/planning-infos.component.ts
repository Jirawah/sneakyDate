import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RdvService } from '../../services/rdv.service';
import { IRdv } from 'src/app/interfaces/rdv.interface';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-planning-infos',
  templateUrl: './planning-infos.component.html',
  styleUrls: ['./planning-infos.component.scss']
})
export class PlanningInfosComponent implements OnInit {

  dataSource$: Observable<IRdv[]> = of([{ id: "ERRORDB", rdvName: "ERRORDB", orga: "ERRORDB", guessList: ["invités"], statut: "open", askToParticipate: "string" }]);
  displayedColumns: string[] = ['id', 'rdvName', 'orga', 'guessList', 'statut', 'askToParticipate'];
  maxGuestLimit = 15; 
  id: string;

  constructor(private route: ActivatedRoute, private rdvService: RdvService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this.id = data.get("id") as string;

      console.log("id", this.id);

      // Utilisez ici le service pour obtenir les données
      this.dataSource$ = this.rdvService.getRdvsForDate(this.id);
    });
  }
}

