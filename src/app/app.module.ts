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
import { PlanningInfosComponent } from './components/planning-infos/planning-infos.component';
import { PlanningComponent } from './components/planning/planning.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CdkTableModule } from '@angular/cdk/table';
import { LoginComponent } from './components/login/login.component';
import { PlanningRdvComponent } from './components/planning-rdv/planning-rdv.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MessageService } from './services/message.service';
import { PlanningInfosDataService } from './services/planning-infos-data.service';
import { RegistrationService } from './services/registration.service';
import { HeaderComponent } from './shared/header/header.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { CardboxService } from './services/cardbox.service';
import { JwtInterceptor } from './services/jwt.interceptor';

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
    MatCardModule,
    MatGridListModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatTableModule,
    CdkTableModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [
    AuthGuard,
    PlanningInfosDataService,
    RegistrationService,
    MessageService,
    CardboxService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
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