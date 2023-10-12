import { Injectable } from '@angular/core';
import { theDate } from '../models/thedate.models';

@Injectable({
  providedIn: 'root' // disponible au niveau global
})
export class PlanningInfosDataService {
  // Définissez les méthodes pour récupérer et stocker les données
  private cardboxData: { [theday_id: number]: theDate } = {};

  constructor() {}

  // Méthode pour stocker les données
  setCardboxInfo(theday_id: number, cardboxInfo: theDate): void {
    this.cardboxData[theday_id] = cardboxInfo;
  }

  // Méthode pour récupérer les données
  getCardboxInfo(theday_id: number): theDate {
    return this.cardboxData[theday_id];
  }
}