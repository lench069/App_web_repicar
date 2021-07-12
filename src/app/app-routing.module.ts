import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { DashboardProveedorComponent } from './components/dashboard-proveedor/dashboard-proveedor.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { LoginComponent } from './components/login/login.component';
import { MisVentasComponent } from './components/mis-ventas/mis-ventas.component';
import { RegistroProveedorComponent } from './components/registro-proveedor/registro-proveedor.component';

const routes: Routes = [
  { path: 'inicio', component: ContenidoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroProveedorComponent },
  { path: 'dashboard_proveedor', component: DashboardProveedorComponent },
  { path: 'mis_ventas', component: MisVentasComponent},
  { path: 'login_admin', component: LoginAdminComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
