import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-admin-proveedores',
  templateUrl: './admin-proveedores.component.html',
  styleUrls: ['./admin-proveedores.component.css']
})
export class AdminProveedoresComponent implements OnInit {
  public menuDashboard:boolean = false;
  public menuEditar:boolean = false;
  public menuProveedores:boolean = true;
  public menuConfiguracion:boolean = false;
  public proveedores:string[]=[];

  constructor(private servicio:ServiciosService,private toastr: ToastrService) {
    this.Cargar_Proveedores();

   }

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
    //this.servicio.irA('/admin_proveedores');
    
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

  Cargar_Proveedores() {

    this.servicio.Proveedores_Listado() // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        console.log(data);
        if (data.length >= 1) {
          this.proveedores = data; 
        } else {
          this.toastr.warning('Aun no tienes ventas concretadas!', 'Aviso');
        }
      }, (error: any) => { //sentencias cuando ocurrio un error

        this.toastr.warning(error + '!', 'Error');
        //this.servicio.irA('/inicio');
      })
  }

}
