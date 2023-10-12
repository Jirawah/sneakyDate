import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningComponent } from './planning/planning.component';
import { PlanningInfosComponent } from './planning-infos/planning-infos.component';
import { PlanningRdvComponent } from './planning-rdv/planning-rdv.component';
import { RegistrationComponent } from './registration/registration.component';

import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    path: 'planning-rdv',
    component: PlanningRdvComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  //mettre les routes au dessus de la route redirection 
  {
    path: '**',
    redirectTo: '/planning',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MatFormFieldModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}


