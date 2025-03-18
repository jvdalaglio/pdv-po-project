import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { PoHttpRequestModule } from '@po-ui/ng-components';
import { environment } from '../environments/environment.dev';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      PoHttpRequestModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
      AngularFireAuthModule
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
