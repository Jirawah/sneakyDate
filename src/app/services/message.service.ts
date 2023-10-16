import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<string|null>(null);
  message$ = this.messageSubject.asObservable();

  setMessage(message: string) {
    this.messageSubject.next(message);
    setTimeout(() => this.messageSubject.next(null), 5000); // Efface le message après 5 secondes.
  }

  clearMessage() {
    this.messageSubject.next(null);
  }
}