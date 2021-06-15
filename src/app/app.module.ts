import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarErrorComponent } from './components/snack-bar-error/snack-bar-error.component';
import { MatInputModule } from '@angular/material/input';
import {  MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { DetailsComponent } from './components/details/details.component';
import { GpsComponent } from './components/gps/gps.component';
import { MapComponent } from './components/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TrabajoDetailsComponent } from './components/trabajo-details/trabajo-details.component';
import { Globals } from './interfaces/globals';
import { AsistenteComponent } from './components/asistente/asistente.component';
import { ParteHorasComponent } from './components/parte-horas/parte-horas.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { ImportDetailComponent } from './components/import-detail/import-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegistrationComponent,
    SnackBarErrorComponent,
    DetailsComponent,
    GpsComponent,
    MapComponent,
    TrabajoDetailsComponent,
    AsistenteComponent,
    ParteHorasComponent,
    ModificarComponent,
    ImportDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    LayoutModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    GoogleMapsModule,

  ],
  providers: [
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
