import { Component } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { USER_KEY } from "src/app/consts/storagekeys.const";
import { AuthService } from "src/app/services/auth.service";
import { __values } from "tslib";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isLogged$ = this.authService.isLogged$;
  memberName = "imposteur";

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const userData = sessionStorage.getItem(USER_KEY);
    if (userData) {
      this.memberName = JSON.parse(userData).memberName;
    }
  }

  logout() {
    window.sessionStorage.clear();
    this.isLogged$.next(false);
    console.warn("Déconnecter");
  }
}
