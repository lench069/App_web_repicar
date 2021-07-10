import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-mis-ventas',
  templateUrl: './mis-ventas.component.html',
  styleUrls: ['./mis-ventas.component.css']
})
export class MisVentasComponent implements OnInit {

  public pedidos_finalizados: any = [];
  public proveedor_id: string = '';
  public fecha_inicial:string='';
  public fecha_final:string='';

  constructor(private servicio: ServiciosService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.proveedor_id = localStorage.getItem('proveedor_id');
    this.Cargar_Pedidos_Finalizados(this.proveedor_id);
  }

  Cargar_Pedidos_Finalizados(id: string) {

    this.servicio.Pedidos_Finalizados_Listado({
      id_proveedor: id
    }) // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        console.log(data);
        if (data.length >= 1) {
          this.pedidos_finalizados = data[0].finalizados;
          this.fecha_inicial = data[0].fecha_ini;
          this.fecha_final = data[0].fecha_fin;
          console.log(this.pedidos_finalizados);
          console.log(this.fecha_inicial);
          console.log(this.fecha_final);
        } else {
          this.toastr.warning('Aun no tienes ventas concretadas!', 'Aviso');
        }
      }, (error: any) => { //sentencias cuando ocurrio un error

        this.toastr.warning(error + '!', 'Error');
        //this.servicio.irA('/inicio');
      })
  }

}
