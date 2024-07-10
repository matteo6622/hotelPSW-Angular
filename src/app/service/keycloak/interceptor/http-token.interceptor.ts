import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { Observable, from, switchMap } from "rxjs";


//Si definisce un INTERCEPTOR che implementa l'interfaccia HTTP Interceptor dove implementa l'unico metodo
//intercept: il suo compito è quello di intercettare il token dell'utente e lo attacca all'header della
//richiesta

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private keycloak: KeycloakService) {}
 
  intercept( req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.keycloak.getToken()).pipe(
      switchMap(token => {
        
        if (token) {
          const cloned = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(cloned);
        }
        return next.handle(req);
      })
    );
  }
}