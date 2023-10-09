import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RdvService } from '../rdv/rdv.service';

@Component({
  selector: 'app-planning-infos',
  templateUrl: './planning-infos.component.html',
  styleUrls: ['./planning-infos.component.scss']
})
export class PlanningInfosComponent implements OnInit {

  dataSource: any[] = [];
  displayedColumns: string[] = ['id','rdvName', 'orga', 'guessList', 'statut', 'askToParticipate'];
  
  id: string|null ;

  constructor(private route:ActivatedRoute, private rdvService: RdvService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(data => this.id=data.get("id"))  
  }
}

