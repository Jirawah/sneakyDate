import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RdvService } from '../../services/rdv.service';

@Component({
  selector: 'app-planning-infos',
  templateUrl: './planning-infos.component.html',
  styleUrls: ['./planning-infos.component.scss']
})
export class PlanningInfosComponent implements OnInit {

  dataSource: any[] = [{ id: "1", rdvName: "LeRDV", orga: "Jira", guessList: "invités", statut: "open", askToParticipate: "string" }];
  displayedColumns: string[] = ['id', 'rdvName', 'orga', 'guessList', 'statut', 'askToParticipate'];

  id: string;

  constructor(private route: ActivatedRoute, private rdvService: RdvService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this.id = data.get("id") as string;

      console.log(this.id);

      // Utilisez ici le service pour obtenir les données
      this.rdvService.getRdvsForDate(this.id).subscribe(rdvs => {
        this.dataSource = rdvs;
      });
    });
  }
}

