import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroProveedorComponent } from './components/registro-proveedor/registro-proveedor.component';

const routes: Routes = [
  { path: 'inicio', component: ContenidoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroProveedorComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
