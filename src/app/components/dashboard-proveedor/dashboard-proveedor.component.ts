import { PlatformLocation } from '@angular/common';
import { Component, OnInit,Output,EventEmitter, NgZone  } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ToastNoAnimationModule, ToastrService } from 'ngx-toastr';
import * as $ from 'src/assets/dashboard/js/jquery-2.1.4.min.js';
import * as elements from 'src/assets/dashboard/js/ace-elements.min.js';



@Component({
  selector: 'app-dashboard-proveedor',
  templateUrl: './dashboard-proveedor.component.html',
  styleUrls: ['./dashboard-proveedor.component.css','/src/assets/dashboard/css/ace.min.css']
})
export class DashboardProveedorComponent implements OnInit {

public pedidos_nuevos:any=[];
public pedidos_enviados:any=[];
public proveedor_id:string='';
public descripcion:string='';
public fotos:string[]=[];
public p_original:number=0;
public p_generico:number=0;
public id_propuesta:number=0;
public chfactura:boolean= false;
public chenvio:boolean=false;


stiloos = "height: '250px',mouseWheelLock: true,alwaysVisible : true";
  constructor(private servicio:ServiciosService, private toastr:ToastrService ,private platformLocation: PlatformLocation,
    private ngZone: NgZone) { 
      
      
  }

  ngOnInit(): void {
    this.proveedor_id = localStorage.getItem('proveedor_id');
      console.log(this.proveedor_id);
      this.Cargar_Pedidos_Nuevos(this.proveedor_id);
      this.Cargar_Pedidos_Enviados(this.proveedor_id);
   
  }

   Cargar_Pedidos_Nuevos(id:string) {

   this.servicio.Pedidos_Nuevos_Listado({
      id_proveedor: id
   }) // llamado al servicio
   .subscribe((data:any)=>{   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
    console.log(data); 
    if(data.length >= 1)
    {
      this.pedidos_nuevos = data;
      
     
        
    }else{
      this.toastr.warning('Aun no tiene pedidos pendientes!', 'Bienvenido');
      console.log('No existen registros');
    }
     

   },(error:any)=>{ //sentencias cuando ocurrio un error

      console.log('error');
      this.toastr.warning(error+'!', 'Bienvenido');
      //this.servicio.irA('/inicio');
   })
 }

 Cargar_Pedidos_Enviados(id:string) {

  this.servicio.Pedidos_Enviados_Listado({
     id_proveedor: id
  }) // llamado al servicio
  .subscribe((data:any)=>{   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
   console.log(data); 
   if(data.length >= 1)
   {
     this.pedidos_enviados = data;
     console.log();
        
   }else{
     this.toastr.warning('Aun no tiene pedidos pendientes!', 'Bienvenido');
     console.log('No existen registros');
   }
    

  },(error:any)=>{ //sentencias cuando ocurrio un error

     console.log('error');
     this.toastr.warning(error+'!', 'Bienvenido');
     //this.servicio.irA('/inicio');
  })
}

 verPedido(pedido)
 {
   this.descripcion = pedido.pedidos[0].DESCRIPCION;
   this.id_propuesta=pedido.pedidos[0].ID_PROPUESTA;
   this.fotos = pedido.fotos;
   console.log(pedido);
 }

 cotizar()
 {
     if(this.id_propuesta!=0)
     {
      this.servicio.Proveedor_Cotiza_Propuesta({
        id_propuesta:this.id_propuesta,
        estado:'Cotizado',
        p_original:this.p_original,
        p_generico:this.p_generico,
        factura:this.chfactura,
        envio:this.chenvio
      }).subscribe((data:any)=>{
        this.toastr.success('Propuesta enviada al cliente!', 'Exito');
        this.Cargar_Pedidos_Nuevos(this.proveedor_id);
        this.Cargar_Pedidos_Enviados(this.proveedor_id);
        this.descripcion='';
        this.fotos=[];
        this.p_original=0;
        this.p_generico=0;
        this.id_propuesta=0;
        this.chfactura= false;
        this.chenvio=false;
      },(error:any)=>{
        this.toastr.error(error, 'Error');
      });
     }else{
        this.toastr.warning('Debe seleccionar un pedido de la bandeja de entrada!', 'Alerta');
     }

     

       
 }




}
