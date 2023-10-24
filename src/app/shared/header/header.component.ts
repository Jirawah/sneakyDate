import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  isLogged$: Observable<boolean>;
  isLogged = false;

  ngOnInit () {
    of(window.sessionStorage.getItem('user')).subscribe(value => this.isLogged = value !== null);
  }

  logout () {
    console.log('Déconnecter')
  }
}


