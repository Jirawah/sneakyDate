import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { USER_KEY } from '../consts/storagekeys.const';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem(USER_KEY);
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
