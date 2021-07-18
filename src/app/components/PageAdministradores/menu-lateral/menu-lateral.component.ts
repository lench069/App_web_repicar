import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  public menuDashboard:boolean = false;
  public menuEditar:boolean = false;
  public menuProveedores:boolean = true;
  public menuConfiguracion:boolean = false;

  constructor(private servicio:ServiciosService) { }

  ngOnInit(): void {
  }

  irMenuDashboard()
  {
    console.log("dashboard");
    this.menuDashboard= true;
    this.menuEditar= false;
    this.menuConfiguracion= false;
    this.menuProveedores=false;
    this.servicio.irA('/dashboard_administrador');
    
  }

  irMenuEditar()
  {
    console.log("dashboard");
    this.menuDashboard= false;
    this.menuEditar= true;
    this.menuConfiguracion= false;
    this.menuProveedores=false;
   // this.servicio.irA('/admin_proveedores');
    
  }

  irMenuProveedores()
  {
    console.log("proveedores");
    this.menuDashboard= false;
    this.menuEditar= false;
    this.menuConfiguracion= false;
    this.menuProveedores=true;
    this.servicio.irA('/add-proveedores');
    
  }
  irMenuConfiguracion()
  {
    console.log("configuraciones");
    this.menuDashboard= false;
    this.menuEditar= false;
    this.menuConfiguracion= true;
    this.menuProveedores=false;
    this.servicio.irA('/configuraciones');
    
  }

  irMenuAdminProveedores()
  {
    console.log("admin proveedores");
    this.menuDashboard= false;
    this.menuEditar= false;
    this.menuConfiguracion= false;
    this.menuProveedores=true;
    this.servicio.irA('/admin-proveedores');
    
  }

}
