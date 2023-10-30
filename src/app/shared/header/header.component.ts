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
  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private authService: AuthService) {}

  ngOnInit () {
    this.isLogged$ = this.authService.isLogged();
  }

  logout () {
    window.sessionStorage.clear();
    this.isLogged$.next(false);
    console.log('Déconnecter')
  }
}


