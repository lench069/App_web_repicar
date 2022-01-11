import { PlatformLocation } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ToastNoAnimationModule, ToastrService } from 'ngx-toastr';
import * as $ from 'src/assets/dashboard/js/jquery-2.1.4.min.js';
import * as elements from 'src/assets/dashboard/js/ace-elements.min.js';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
//galery
import {Gallery, Images} from 'angular-gallery';
//interface
import{imagenesPath} from 'src/app/interfaces/imagenes.interface'
//spinner
import { NgxSpinnerService } from "ngx-spinner";
import { NgControl } from '@angular/forms';



@Component({
  selector: 'app-dashboard-proveedor',
  templateUrl: './dashboard-proveedor.component.html',
  styleUrls: [ '/src/assets/dashboard/css/ace.min.css','./dashboard-proveedor.component.css']
})
export class DashboardProveedorComponent implements OnInit {

  public pedidos_nuevos: any = [];
  public pedidos_enviados: any = [];
  public pedidos_aceptados: any = [];
  public proveedor_id: string = '';
  public descripcion: string = '';
  public fotos: string[] = [];
  public p_original: number = 0;
  public p_generico: number = 0;
  public p_original_Coti: number = 0;
  public p_generico_Coti: number = 0;
  public id_propuesta: number = 0;
  public chfactura: boolean = false;
  public chenvio: boolean = false;
  public numPedido: string = '';
  public pedidoSeleccionado: object = {};
  public p_envio: number = 0;
  forma: FormGroup;
  public activar_preenvio: boolean = false;
  public Tipo_vehiculos: string[] = [];
  public selectedTipoV: any = null;
  public selectedMarca: any = null;
  public id_tipov: number = 0;
  public marcas: string[] = [];
  public Transitoria: any = null;
  public marcasPorTipoV: string[] = [];
  public tipV: string = '';
  public termino: string = '';
  public mostrarEntrada: boolean = null;
  public mostrarEnviada: boolean = null;
  public galery:any[];
  public foto:imagenesPath = {};
  public editPropuesta:boolean;
  public actionCotizar:boolean = false;
  public actionEditar:boolean = false;



  stiloos = "height: '250px',mouseWheelLock: true,alwaysVisible : true";
  constructor(private servicio: ServiciosService, private toastr: ToastrService, private platformLocation: PlatformLocation,
    private ngZone: NgZone, private fb: FormBuilder,private gallery: Gallery,private spinner: NgxSpinnerService) {

    this.crearFormulario();
    this.editPropuesta = false;
  }

  ngOnInit(): void {
    this.proveedor_id = localStorage.getItem('proveedor_id');
    console.log(this.proveedor_id);
    this.Cargar_Pedidos_Nuevos(this.proveedor_id);
    this.Cargar_Pedidos_Enviados(this.proveedor_id);
    this.Cargar_Pedidos_Aceptados(this.proveedor_id);
    this.getTipoVehiculos();
    
    
  }

  verTodosNuevos() {
    this.Cargar_Pedidos_Nuevos(this.proveedor_id);
    this.selectedTipoV = null;
    this.selectedMarca = null;
    this.marcasPorTipoV = [];
    this.termino = '';

  }

  get p_originalNoValido() {
    return this.forma.get('pre_original').invalid && this.forma.get('pre_original').touched
  }

  get p_genericoNoValido() {
    return this.forma.get('pre_generico').invalid && this.forma.get('pre_generico').touched
  }
  get p_envioNoValido() {
    return this.forma.get('pre_envio').invalid && this.forma.get('pre_envio').touched
  }

  crearFormulario() {
    this.actionCotizar = false;
    this.actionEditar = false;
    this.forma = this.fb.group({
      pre_original: ['', [Validators.required]],
      pre_generico: ['', [Validators.required]],
      pre_envio: [0, [Validators.min(0)]],
      checkFactura: [false],
      checkEnvio: [false]
    });

  }

  calcularOriginal() {
    this.p_original_Coti = this.forma.value.pre_original + (this.forma.value.pre_original * 0.1);
  }
  calcularGenerico() {
    this.p_generico_Coti = this.forma.value.pre_generico + (this.forma.value.pre_generico * 0.1);
  }

  Cargar_Pedidos_Nuevos(id: string) {
    this.spinner.show();
    this.servicio.Pedidos_Nuevos_Listado({
      id_proveedor: id
    }) // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        console.log(data);
        if (data.length >= 1) {
          this.pedidos_nuevos = data;
          this.spinner.hide();

        } else {
          this.pedidos_nuevos = [];
          this.toastr.warning('Aun no tiene nuevos pedidos!', 'Bienvenido');
          console.log('No existen registros');
          this.spinner.hide();
        }

      }, (error: any) => { //sentencias cuando ocurrio un error

        console.log('error');
        this.toastr.warning(error + '!', 'Bienvenido');
        this.spinner.hide();
        //this.servicio.irA('/inicio');
      })
  }


  Cargar_Pedidos_Nuevos_Por_TipoV(detalle_tipov: string) {
    console.log(detalle_tipov);
    this.spinner.show();
    this.servicio.Pedidos_Nuevos_Listado_Por_TipoV({
      id_proveedor: this.proveedor_id,
      detalle_tipov: detalle_tipov

    }) // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        console.log(data);
        this.selectedMarca = null;
        this.pedidos_nuevos = data;
        this.marcasPorTipoV = [];
        this.termino = '';
        if (data.length >= 1) {

          for (let i = 0; i < this.pedidos_nuevos.length; i++) {
            this.marcasPorTipoV.push(this.pedidos_nuevos[i].pedidos[0]);
          }
          console.log(this.marcasPorTipoV);
          this.tipV = detalle_tipov;

        } else {
          this.pedidos_nuevos = [];
          this.toastr.warning('No existen pedidos para este tipo de vehiculo!', 'Alerta');
          console.log('No existen registros por tipo vehiculo');
        }
        this.spinner.hide();

      }, (error: any) => { //sentencias cuando ocurrio un error

        console.log('error');
        this.toastr.warning(error + '!', 'Bienvenido');
        this.spinner.hide();
        //this.servicio.irA('/inicio');
      })
  }

  buscarTermino() {
    console.log(this.termino);
    this.spinner.show();
    this.servicio.Pedidos_Nuevos_Listado_Por_Termino({
      id_proveedor: this.proveedor_id,
      termino: this.termino

    }) // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        console.log(data);
        this.selectedMarca = null;
        this.selectedTipoV = null;
        if (data.length >= 1) {

          this.pedidos_nuevos = data;

        } else {
          this.pedidos_nuevos = [];
          this.toastr.warning('No existen pedidos congruentes con este termino!', 'Alerta');
          console.log('No existen registros por tipo vehiculo');
        }
        this.spinner.hide();

      }, (error: any) => { //sentencias cuando ocurrio un error

        console.log('error');
        this.toastr.warning(error + '!', 'Bienvenido');
        this.spinner.hide();
        //this.servicio.irA('/inicio');
      })
  }

  Cargar_Pedidos_Nuevos_Por_MARCA(detalle_marca: string) {
    console.log(detalle_marca);
    this.spinner.show();
    this.servicio.Pedidos_Nuevos_Listado_Por_Marca({
      id_proveedor: this.proveedor_id,
      detalle_tipov: this.tipV,
      detalle_marca: detalle_marca

    }) // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        console.log(data);
        if (data.length >= 1) {
          this.pedidos_nuevos = data;

        } else {
          this.pedidos_nuevos = [];
          this.toastr.warning('No existen pedidos para esta marca!', 'Alerta');
          console.log('No existen registros por tipo vehiculo');
        }
        this.spinner.hide();

      }, (error: any) => { //sentencias cuando ocurrio un error

        console.log('error');
        this.toastr.warning(error + '!', 'Bienvenido');
        this.spinner.hide();
        //this.servicio.irA('/inicio');
      })
  }

  Cargar_Pedidos_Enviados(id: string) {
    this.spinner.show();
    this.servicio.Pedidos_Enviados_Listado({
      id_proveedor: id
    }) // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        console.log(data);
        if (data.length >= 1) {
          this.pedidos_enviados = data;
          console.log(this.pedidos_enviados);
          this.spinner.hide();
        } else {
          this.pedidos_enviados = [];
          this.toastr.warning('Aun no tiene pedidos pendientes!', 'Bienvenido');
          console.log('No existen registros');
          this.spinner.hide();
        }
      }, (error: any) => { //sentencias cuando ocurrio un error

        console.log('error');
        this.toastr.warning(error + '!', 'Bienvenido');
        this.spinner.hide();
        //this.servicio.irA('/inicio');
      })
  }

  Cargar_Pedidos_Aceptados(id: string) {
    this.spinner.show();
    this.servicio.Pedidos_Aceptados_Listado({
      id_proveedor: id
    }) // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        console.log(data);
        if (data.length >= 1) {
          this.pedidos_aceptados = data;
          console.log(this.pedidos_aceptados);
          this.spinner.hide();
        } else {
          this.toastr.warning('Aun no tiene pedidos aceptados!', 'Bienvenido');
          console.log('No existen registros');
          this.spinner.hide();
        }


      }, (error: any) => { //sentencias cuando ocurrio un error

        this.toastr.error(error + '!', 'Algo salio mal');
        this.spinner.hide();
        this.servicio.irA('/inicio');
      })
  }


  verPedido(pedido) {
    this.crearFormulario();
    this.fotos = [];
    this.galery = [];
    this.mostrarEntrada = true;
    this.mostrarEnviada = false;
    console.log(pedido);
    this.pedidoSeleccionado = pedido.pedidos;
    this.descripcion = pedido.pedidos[0].DESCRIPCION;
    this.id_propuesta = pedido.pedidos[0].ID_PROPUESTA;
    this.fotos = pedido.fotos; 
    console.log(this.fotos);
   for(let i=0;i<pedido.fotos.length;i++)
   {
      this.foto= {path:pedido.fotos[i].IMAGEN};
      this.galery.push(this.foto);  
   }
   console.log(this.galery);

  }

  showGallery(index: number) {
    let prop = {
        images: this.galery,
        index ,
        counter: true
    };
    this.gallery.load(prop);
}
verPedidoEntrada(pedido) {
    this.verPedido(pedido);
    this.actionCotizar = true;
}

  verPedidoEnviada(pedido,opcion) {
    this.verPedido(pedido);
    this.editPropuesta = opcion == 'ver' ? true : false;
    console.log('estoy viendo');
    this.forma = this.fb.group({
        pre_original: [{value: this.pedidoSeleccionado[0].P_ORIGINAL,disabled:this.editPropuesta}, [Validators.required]],
        pre_generico: [{value: this.pedidoSeleccionado[0].P_GENERICO,disabled: this.editPropuesta}, [Validators.required]],
        pre_envio: [{value: this.pedidoSeleccionado[0].P_ENVIO,disabled: this.editPropuesta}, [Validators.min(0)]],
        checkFactura: {value: parseInt(this.pedidoSeleccionado[0].FAC_PROPUESTA) ,disabled: this.editPropuesta},
        checkEnvio: {value: parseInt(this.pedidoSeleccionado[0].ENV_PROPUESTA) ,disabled: this.editPropuesta},   
    });
    this.p_generico_Coti = this.pedidoSeleccionado[0].P_GENERICO_COM;
    this.p_original_Coti = this.pedidoSeleccionado[0].P_ORIGINAL_COM;
    if(!this.editPropuesta){
      this.actionEditar = true;
    }
    
  }

  verPedidoEnviadaEliminar(pedido){
      console.log('Eliminadno');
  }

  getTipoVehiculos() {
    this.spinner.show();
    this.servicio.Tipo_vehiculo() // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso

        this.Tipo_vehiculos = data.info.items;
        console.log(this.Tipo_vehiculos);
        this.spinner.hide();


      }, (error: any) => { //sentencias cuando ocurrio un error
        this.toastr.warning(error + '!');
        this.spinner.hide();
      })
  }

  /*Cargar_Marcas(id_tipov:number)
   {
     console.log(id_tipov);
     this.id_tipov = id_tipov;
     if(this.id_tipov != 0)
     {
       this.servicio.Marcas_Tipov(this.id_tipov)
       .subscribe((data:any)=>{
       // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
         if(data.info.items.length > 0)
         {
           this.selectedMarca = null;
           this.marcas = data.info.items;
           console.log(this.marcas);
           console.log(this.selectedTipoV);
           console.log(this.selectedMarca);
         
         }else{
           this.toastr.error('El tipo de vehiculo seleccionado no tiene marcas asociadas.', 'Error');
         }
         
       },(error:any)=>{
           this.toastr.error('No se pudo realizar la peticion.', 'Error');
       });
     }
 
   };*/


  cotizar() {

    if (this.forma.invalid) {
      console.log('invalido');
      return Object.values(this.forma.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });

    } else {   

      if (this.id_propuesta != 0) {
       // this.spinner.show();
          if(this.actionCotizar)
          {
            console.log(this.pedidoSeleccionado[0]);   
                   //enviar push
                    this.servicio.push_notificacion({
                      id_cliente : this.pedidoSeleccionado[0].ID_CLIENTE,
                      titulo: 'Nueva propuesta',
                      desc: 'Tiene una propuesta para el pidido AFSFGGHGA',
                      token: this.pedidoSeleccionado[0].TOKEN
                    }).subscribe((data: any) => {
                         console.log(data);
                      }, (error: any) => {
                          
                      });
            
                  this.servicio.Proveedor_Cotiza_Propuesta({
                    id_propuesta: this.id_propuesta,
                    estado: 'Cotizado',
                    p_original: this.forma.value.pre_original,
                    p_generico: this.forma.value.pre_generico,
                    factura: this.forma.value.checkFactura,
                    envio: this.forma.value.checkEnvio,
                    p_original_com: this.p_original_Coti,
                    p_generico_com: this.p_generico_Coti,
                    p_envio: this.forma.value.pre_envio
                }).subscribe((data: any) => {
                    this.toastr.success('Propuesta enviada al cliente!', 'Exito');
                    this.Cargar_Pedidos_Nuevos(this.proveedor_id);
                    this.Cargar_Pedidos_Enviados(this.proveedor_id);
                    this.pedidoSeleccionado = []; 
                    this.spinner.hide();
                }, (error: any) => {
                    this.toastr.error(error, 'Error');
                    this.spinner.hide();
                });
     
          }
          if(this.actionEditar)
          {
            this.servicio.Proveedor_EditarCotiza_Propuesta({
              id_propuesta: this.id_propuesta,
              p_original: this.forma.value.pre_original,
              p_generico: this.forma.value.pre_generico,
              factura: this.forma.value.checkFactura,
              envio: this.forma.value.checkEnvio,
              p_original_com: this.p_original_Coti,
              p_generico_com: this.p_generico_Coti,
              p_envio: this.forma.value.pre_envio
          }).subscribe((data: any) => {
              this.toastr.success('La propuesta se edito correctamente!', 'Exito');
              this.Cargar_Pedidos_Nuevos(this.proveedor_id);
              this.Cargar_Pedidos_Enviados(this.proveedor_id);
              this.pedidoSeleccionado = [];
              this.spinner.hide();
          }, (error: any) => {
              this.toastr.error(error, 'Error');
              this.spinner.hide();
          });
          }

      } else {
        this.toastr.warning('Debe seleccionar un pedido de la bandeja de entrada!', 'Alerta');
        this.spinner.hide();
      }

    }
  }

  clickCheckEnvio() {
    this.activar_preenvio = this.forma.value.checkEnvio;
    console.log(this.activar_preenvio);
  }

  bucarNumPedido() {
    /*buscar pedido*/
    this.spinner.show();
    if (this.numPedido == '') {
      this.toastr.warning('Debe ingresar un codigo de pedido!', 'Alerta');   
    } else if (this.numPedido.length < 10) {
      this.toastr.warning('El codigo de pedido debe tener 10 caracteres!', 'Alerta');
    } else if (this.numPedido.length == 10) {
      this.servicio.pedido_consultar({
        numPedido: this.numPedido,
        proveedor_id: this.proveedor_id,
        estado: 'Aceptado'
      })
        .subscribe((data: any) => {
          console.log(data);
          let response = data[0];
          if(response.result == 'true')
          {
            this.numPedido = "";
            this.Cargar_Pedidos_Enviados(this.proveedor_id);
            this.Cargar_Pedidos_Aceptados(this.proveedor_id);
            this.toastr.warning(response.msg +'!', 'Alerta');
          }else{
            this.toastr.warning(response.msg +'!', 'Alerta');
          }
          
          this.spinner.hide();

        }, (error: any) => {
          console.log('errorAceptar');
          this.spinner.hide();


        });
       
    }
    this.spinner.hide();
  }




}
