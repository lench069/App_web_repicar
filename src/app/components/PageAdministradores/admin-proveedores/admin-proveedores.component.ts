import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-admin-proveedores',
  templateUrl: './admin-proveedores.component.html',
  styleUrls: ['./admin-proveedores.component.css']
})
export class AdminProveedoresComponent implements OnInit {
 
  public proveedores:string[]=[];

  constructor(private servicio:ServiciosService,private toastr: ToastrService) {
    this.Cargar_Proveedores();

   }

  ngOnInit(): void {
    
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

  editProveedor(item)
  {
      console.log(item);
      this.servicio.irA('/edit_proveedores/'+item.CI_RUC);
  }

}
