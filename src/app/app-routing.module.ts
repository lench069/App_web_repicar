import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { DashboardProveedorComponent } from './components/dashboard-proveedor/dashboard-proveedor.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { LoginComponent } from './components/login/login.component';
import { MisVentasComponent } from './components/mis-ventas/mis-ventas.component';
import { AddProveedoresComponent } from './components/PageAdministradores/add-proveedores/add-proveedores.component';
import { AdminProveedoresComponent } from './components/PageAdministradores/admin-proveedores/admin-proveedores.component';
import { ConfiguracionesComponent } from './components/PageAdministradores/configuraciones/configuraciones.component';
import { EditProveedoresComponent } from './components/PageAdministradores/edit-proveedores/edit-proveedores.component';
import { MenuLateralComponent } from './components/PageAdministradores/menu-lateral/menu-lateral.component';
import { RegistroProveedorComponent } from './components/registro-proveedor/registro-proveedor.component';

const routes: Routes = [
  { path: 'inicio', component: ContenidoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroProveedorComponent },
  { path: 'dashboard_proveedor', component: DashboardProveedorComponent },
  { path: 'mis_ventas', component: MisVentasComponent},
  { path: 'login_admin', component: LoginAdminComponent},
  { path: 'add-proveedores', component: AddProveedoresComponent},
  { path: 'admin-proveedores', component: AdminProveedoresComponent},
  { path: 'menu_lateral', component: MenuLateralComponent},
  { path: 'configuraciones', component: ConfiguracionesComponent},
  { path: 'edit_proveedores/:ci_ruc', component: EditProveedoresComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
