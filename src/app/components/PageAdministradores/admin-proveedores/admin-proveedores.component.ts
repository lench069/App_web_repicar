import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
//spinner
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-admin-proveedores',
  templateUrl: './admin-proveedores.component.html',
  styleUrls: ['./admin-proveedores.component.css']
})
export class AdminProveedoresComponent implements OnInit {
 
  public proveedores:string[]=[];

  constructor(private servicio:ServiciosService,private toastr: ToastrService,private spinner: NgxSpinnerService) {
    
   }

  ngOnInit(): void {
    this.Cargar_Proveedores();

  }

  Cargar_Proveedores() {
    this.spinner.show();
    this.servicio.Proveedores_Listado() // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        console.log(data);
        if (data.length >= 1) {
          this.proveedores = data; 
        } else {
          this.toastr.warning('Aun no tienes ventas concretadas!', 'Aviso');
        }
        this.spinner.hide();
      }, (error: any) => { //sentencias cuando ocurrio un error

        this.toastr.warning(error + '!', 'Error');
        this.spinner.hide();        
        //this.servicio.irA('/inicio');
      })

      setTimeout(function(){
        $('#DTproveedores').DataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }
        });    
    }, 1000);
  }

  editProveedor(item)
  {
      console.log(item);
      this.servicio.irA('/edit_proveedores/'+item.CI_RUC);
  }
  verPagos(proveedorSeleccionado)
  {
    this.servicio.irA('/ventas_proveedor/'+proveedorSeleccionado.CI_RUC);
  }

}
