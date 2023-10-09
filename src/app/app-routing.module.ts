import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningComponent } from './planning/planning.component';
import { PlanningInfosComponent } from './planning-infos/planning-infos.component';

const routes: Routes = [
  {
    path: 'planning',
    component: PlanningComponent
  }, 
  {   
    path: 'planning-infos/:id',
    component: PlanningInfosComponent
  }, 
  {
    path: '**',
    redirectTo: '/planning',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


