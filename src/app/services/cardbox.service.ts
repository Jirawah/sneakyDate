import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CardboxService {
  // URL de base pour votre API. Changez cela pour pointer vers votre serveur.
  private readonly BASE_URL = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  /**
   * Récupère la date correspondant à un cardbox_id donné.
   * @param cardbox_id - L'ID du cardbox.
   * @returns Observable avec la réponse de l'API.
   */
  getDateByCardboxId(cardbox_id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/cardbox/${cardbox_id}`);
  }

  // Ajoutez d'autres méthodes au besoin pour d'autres interactions avec l'API.
}
