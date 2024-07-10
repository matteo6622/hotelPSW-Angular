import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';

import { KeycloakService } from 'keycloak-angular';
import keycloakConfig from './service/keycloak/keycloak-config';
import { AuthInterceptor } from './service/keycloak/interceptor/http-token.interceptor';
import { AuthGuard } from './service/keycloak/guards/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideHttpClient(
                withInterceptorsFromDi()
              ),
              provideAnimations(), provideAnimationsAsync(),
              MessageService,
              {
                provide: APP_INITIALIZER,
                useFactory: initializeKeycloak,
                multi: true,
                deps: [KeycloakService]
              },
              KeycloakService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true
              },
              AuthInterceptor,
              AuthGuard
              
  ]
};

// export function initializeKeycloak(keycloakService: KeycloakService) {
//   return () => keycloakService.init();
// }

export function initializeKeycloak(keycloak: KeycloakService) {
  
  return async() => 
    keycloak.init({
      config: keycloakConfig,
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true,

      }
    });
}
