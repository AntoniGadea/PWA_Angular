import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { GpsComponent } from './components/gps/gps.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { ParteHorasComponent } from './components/parte-horas/parte-horas.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TrabajoDetailsComponent } from './components/trabajo-details/trabajo-details.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'fichar', component: GpsComponent, canActivate: [AuthGuard] },
  { path: 'mapa', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'horas', component: TrabajoDetailsComponent, canActivate: [AuthGuard] },
  { path: 'parte', component: ParteHorasComponent, canActivate: [AuthGuard] },
  { path: 'modificar', component: ModificarComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
