import { PlatformLocation } from '@angular/common';
import { Component, OnInit,Output,EventEmitter, NgZone  } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import * as $ from 'src/assets/dashboard/js/jquery-2.1.4.min.js';
import * as elements from 'src/assets/dashboard/js/ace-elements.min.js';



@Component({
  selector: 'app-dashboard-proveedor',
  templateUrl: './dashboard-proveedor.component.html',
  styleUrls: ['./dashboard-proveedor.component.css','/src/assets/dashboard/css/ace.min.css']
})
export class DashboardProveedorComponent implements OnInit {

public pedidos_nuevos:any=[];


stiloos = "height: '250px',mouseWheelLock: true,alwaysVisible : true";
  constructor(private servicio:ServiciosService,private platformLocation: PlatformLocation,
    private ngZone: NgZone) { 
      this.Cargar_Pedidos_Nuevos();
      
  }

  ngOnInit(): void {
    
   
  }

   Cargar_Pedidos_Nuevos() {

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
