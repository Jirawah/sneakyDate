import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningInfosComponent } from './components/planning-infos/planning-infos.component';
import { PlanningRdvComponent } from './components/planning-rdv/planning-rdv.component';
import { PlanningComponent } from './components/planning/planning.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfilComponent } from './components/profil/profil.component';

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
    path: 'planning-rdv/:id',
    component: PlanningRdvComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuard]
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


