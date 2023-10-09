import { Component } from '@angular/core';
/*
*  J'importe les éléments dont on va avoir besoin dans notre fichier
*  Ici, j'importe l'élément { component } qui vient de la librairie @angular/core (le coeur d'Angular) 
*/

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
/*
*  J'utilise l'importation component sous la forme d'un décorateur avec @
*  Permet de construire un composent web avec Angular 
*/
export class AppComponent {

}
/*
*  Je définit une classe appelée AppComponent.
*  Cette classe représente le composant principal de mon application.
*  Ici, elle a une propriété "title" qui contient le titre de notre application.
*/