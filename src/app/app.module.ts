import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { FooterComponent } from './components/footer/footer.component';

//para hacer peticiones http
import {HttpClientModule} from '@angular/common/http'
import { RegistroProveedorComponent } from './components/registro-proveedor/registro-proveedor.component';
//importar las rutas
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
//formularios
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
//se usa para los toast
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardProveedorComponent } from './components/dashboard-proveedor/dashboard-proveedor.component';
import { HeaderProveedorComponent } from './components/header-proveedor/header-proveedor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContenidoComponent,
    FooterComponent,
    RegistroProveedorComponent,
    LoginComponent,
    DashboardProveedorComponent,
    HeaderProveedorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //para las rutas
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 20000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
