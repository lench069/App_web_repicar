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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContenidoComponent,
    FooterComponent,
    RegistroProveedorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //para las rutas
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
