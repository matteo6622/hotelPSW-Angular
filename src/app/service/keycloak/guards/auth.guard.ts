import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

import { Injectable, inject } from "@angular/core";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";
import { MessageService } from "primeng/api";

//Si definisce una GUARDIA che viene messa come canActivate nel app routes. Ha il compito di controllare
//innanzitutto se l'utente è autenticato e se ha il ruolo admin: 
//in caso positivo, l'utente può visualizzare le pagine, altrimenti no.

@Injectable({
  providedIn: 'root' 
})
export class AuthGuard extends KeycloakAuthGuard {
    constructor(protected override router: Router, protected override keycloakAngular: KeycloakService,
      protected  messageService: MessageService)
     {
      super(router, keycloakAngular);
    }
    isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      
      return new Promise(async (resolve, reject) => {
        
        if (!this.authenticated) {
          this.keycloakAngular.login();
          return;
        }
        
        const requiredRoles = "admin";
        if (requiredRoles.length === 0) {
          resolve(true);
          return;
        } else {
          const hasRequiredRole =  this.roles.includes(requiredRoles);
          resolve(hasRequiredRole);
          if(!hasRequiredRole) {
            console.log("Non possiedi i requisiti per entrare in questa sezione!");
            this.messageService.add({key:'bc', severity: 'error', detail:
              'Non possiedi i requisiti per entrare in questa sezione! '});
          }
          }
      });
    }
  }

