import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  isLogged$ = this.authService.isLogged$;

  constructor(private authService: AuthService) {}

  ngOnInit () {
    
      }

  logout () {
    window.sessionStorage.clear();
    this.isLogged$.next(false);
    console.log('Déconnecter')
  }
}


