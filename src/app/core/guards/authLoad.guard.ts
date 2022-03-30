import { Injectable } from "@angular/core";
import { CanLoad, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { SharedService } from "../services/shared.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthLoadGuard implements CanLoad {
    constructor(
      private readonly authService: AuthService,
      private readonly router: Router,
      private sharedMessage: SharedService
    ) {}
  
    canLoad(): boolean {
        if (this.authService.isAuthenticated()) {
            if(this.authService.getRol() =='ESTUDIANTE' || this.authService.getRol() =='PROFESOR'){
              this.sharedMessage.msgError("No tiene autorización para visitar esta pagina");
              this.router.navigate(['/login']); 
              this.authService.logout();
              return false;
            }
            return true;
          }
          return false
        }
    }