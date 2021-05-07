import { Component, OnInit,Output,EventEmitter  } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-dashboard-proveedor',
  templateUrl: './dashboard-proveedor.component.html',
  styleUrls: ['/src/assets/dashboard/css/ace.min.css','./dashboard-proveedor.component.css']
})
export class DashboardProveedorComponent implements OnInit {

public pedidos_nuevos:any=[];

  constructor(private servicio:ServiciosService) { 
    
    this.Cargar_Pedidos_Nuevos();
  }

  ngOnInit(): void {
  }

  async Cargar_Pedidos_Nuevos() {

   this.servicio.Pedidos_Nuevos_Listado({
      id_proveedor: '06042629568'
   }) // llamado al servicio
   .subscribe((data:any)=>{   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
    console.log(data);
    if(data.length >= 1)
    {
      this.pedidos_nuevos = data;
    }else{
      console.log('No existen registros');
    }
     

   },(error:any)=>{ //sentencias cuando ocurrio un error

      console.log('error');
      //this.servicio.irA('/inicio');
   })
 }
 verPedido(pedido)
 {
   console.log(pedido);
 }

 
}
