import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RdvService } from '../services/rdv.service';

@Component({
  selector: 'app-planning-rdv',
  templateUrl: './planning-rdv.component.html',
  styleUrls: ['./planning-rdv.component.scss']
})
export class PlanningRdvComponent implements OnInit {

  id: string;
  rdv: any = {
    rdvName: '',
    orga: '',
    guestList: [],
    statut: ''
  };

  constructor(private route: ActivatedRoute, private rdvService: RdvService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.id = data.get("id") as string;
    });
  }

  onSubmit() {
    this.rdvService.createRdv(this.rdv).subscribe(response => {
      this.router.navigate([`/planning-infos/${this.id}`]);
    }, error => {
      console.error('Erreur lors de la création du RDV:', error);
    });
  }
}
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
