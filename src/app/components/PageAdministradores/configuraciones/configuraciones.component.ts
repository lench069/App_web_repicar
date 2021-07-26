import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  public tipoPublicidades: string[]=[];
  public licencias: string[]=[];
  public comisiones: string[]=[];
  public flagEditar:boolean=true;

  constructor(private servicio: ServiciosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cargarPublicidad();
    this.cargarLicencias();
    this.cargarComisiones()
  }

  cargarPublicidad()
  {
    this.servicio.Publicidad_TipoListado() // llamado al servicio
    .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
      console.log(data);
      if (data.info.items.length >= 1) {
        this.tipoPublicidades = data.info.items; 
        console.log(this.tipoPublicidades);
      } else {
        this.toastr.warning('No existen publicidades!', 'Aviso');
      }
    }, (error: any) => { //sentencias cuando ocurrio un error

      this.toastr.warning(error + '!', 'Error');
      //this.servicio.irA('/inicio');
    })
  }
  cargarLicencias()
  {
    this.servicio.Licencias_Listado() // llamado al servicio
    .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
      console.log(data);
      if (data.info.items.length >= 1) {
        this.licencias = data.info.items; 
        console.log(this.licencias);
      } else {
        this.toastr.warning('No existen licencias!', 'Aviso');
      }
    }, (error: any) => { //sentencias cuando ocurrio un error

      this.toastr.warning(error + '!', 'Error');
      //this.servicio.irA('/inicio');
    })
  }
  cargarComisiones()
  {
    this.servicio.Comisiones_Listado()// llamado al servicio
    .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
      console.log(data);
      if (data.info.items.length >= 1) {
        this.comisiones = data.info.items; 
        console.log(this.comisiones);
      } else {
        this.toastr.warning('No existen comisiones!', 'Aviso');
      }
    }, (error: any) => { //sentencias cuando ocurrio un error

      this.toastr.warning(error + '!', 'Error');
      //this.servicio.irA('/inicio');
    })
  }

  editPublicidad(a)
  {
      console.log(a);
  }

}
