import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { APP_BASE_HREF, PlatformLocation, DatePipe } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';

export const APP_TITLE = "Recipe Box"; //`${environment.appTitle}`;
export const REST_DB_PATH = `https://www.teapothill.org/${environment.baseHref}/api` //`${environment.baseHref}/db`; 

export const HOST_RECIPES_SERVICE = 'recipes';
export const HOST_INGREDIENTS_SERVICE = 'ingredients';
export const HOST_DIRECTIONS_SERVICE = 'directions';

export const DB_RECIPES_SERVICE = `${REST_DB_PATH}/${HOST_RECIPES_SERVICE}`;
export const DB_INGREDIENTS_SERVICE = `${REST_DB_PATH}/${HOST_INGREDIENTS_SERVICE}`;
export const DB_DIRECTIONS_SERVICE = `${REST_DB_PATH}/${HOST_DIRECTIONS_SERVICE}`;

export function getBaseHref(platformLocation: PlatformLocation) {
  return platformLocation.getBaseHrefFromDOM();
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),  // withInterceptors([authInterceptor])),
    {
        provide: APP_BASE_HREF,
        useFactory: getBaseHref,
        deps: [PlatformLocation],
    }  /*, provideStore(), provideEffects(), provideAnimations()*/, DatePipe]
};