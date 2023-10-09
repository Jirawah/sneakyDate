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
import { AppComponent } from './app.component';
import { PlanningComponent } from './planning/planning.component';
import { PlanningInfosComponent } from './planning-infos/planning-infos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { FlexLayoutModule } from '@angular/flex-layout';

import { PlanningInfosDataService } from './planning-infos/planning-infos-data.service';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    PlanningComponent,
    PlanningInfosComponent
  ],
  imports: [
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [
    PlanningInfosDataService
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