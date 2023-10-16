import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/*
*  { NgModule } Module du coeur d'Angular qu'on utilise pour déclarer un module auprès d'Angular (@NgModule)
*  { BrowserModule } est un module qui va fournir les éléments essentiels pour le fonctionnement de mon application (ex: directive *ngIf et *ngFor)
*/
import { AppRoutingModule } from './app-routing.module';
/*
*  J'importe le fichier qui contient les routes de mon projet et le premier composant dans le module racine
*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PlanningInfosComponent } from './planning-infos/planning-infos.component';
import { PlanningComponent } from './planning/planning.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PlanningInfosDataService } from './services/planning-infos-data.service';
import { CdkTableModule } from '@angular/cdk/table';
import { PlanningRdvComponent } from './planning-rdv/planning-rdv.component';
import { RegistrationService } from './services/registration.service';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [
    AppComponent,
    PlanningComponent,
    PlanningInfosComponent,
    PlanningRdvComponent,
    HeaderComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatTableModule,
    CdkTableModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [
    PlanningInfosDataService,
    RegistrationService,
    MessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
/*
*  declaration : liste de tous les composants, les directives, les pipes... qui appartiennent à ce module 
*  imports : permet de déclarer tous les éléments dont on a besoin d'importer dans notre module mais qui sont d'autres modules
*  providers : permet d'utiliser le système d'injection des dépendances d'Angular
*  bootstrap : composant racine, permet de dire à Angular quel composant doit démarer en premier lorsque l'utilisateur charge l'application dans son navigateur
*/