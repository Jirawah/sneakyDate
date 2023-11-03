import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { USER_KEY } from '../consts/storagekeys.const';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Récupérez le token du localStorage
    const user = sessionStorage.getItem(USER_KEY);
    const token = user ? JSON.parse(user).token : null;
    if (token) {
      // Clonez la requête et ajoutez l'en-tête d'autorisation
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}