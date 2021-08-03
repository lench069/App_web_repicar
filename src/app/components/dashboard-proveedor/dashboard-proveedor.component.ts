import { PlatformLocation } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ToastNoAnimationModule, ToastrService } from 'ngx-toastr';
import * as $ from 'src/assets/dashboard/js/jquery-2.1.4.min.js';
import * as elements from 'src/assets/dashboard/js/ace-elements.min.js';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'app-dashboard-proveedor',
  templateUrl: './dashboard-proveedor.component.html',
  styleUrls: ['./dashboard-proveedor.component.css', '/src/assets/dashboard/css/ace.min.css']
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



  stiloos = "height: '250px',mouseWheelLock: true,alwaysVisible : true";
  constructor(private servicio: ServiciosService, private toastr: ToastrService, private platformLocation: PlatformLocation,
    private ngZone: NgZone, private fb: FormBuilder,) {

    this.crearFormulario();
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

    this.forma = this.fb.group({
      pre_original: ['', [Validators.required]],
      pre_generico: ['', [Validators.required]],
      pre_envio: ['', [Validators.required]],
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

    this.servicio.Pedidos_Nuevos_Listado({
      id_proveedor: id
    }) // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        console.log(data);
        if (data.length >= 1) {
          this.pedidos_nuevos = data;

        } else {
          this.pedidos_nuevos = [];
          this.toastr.warning('Aun no tiene nuevos pedidos!', 'Bienvenido');
          console.log('No existen registros');
        }

      }, (error: any) => { //sentencias cuando ocurrio un error

        console.log('error');
        this.toastr.warning(error + '!', 'Bienvenido');
        //this.servicio.irA('/inicio');
      })
  }


  Cargar_Pedidos_Nuevos_Por_TipoV(detalle_tipov: string) {
    console.log(detalle_tipov);

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

      }, (error: any) => { //sentencias cuando ocurrio un error

        console.log('error');
        this.toastr.warning(error + '!', 'Bienvenido');
        //this.servicio.irA('/inicio');
      })
  }

  buscarTermino() {
    console.log(this.termino);

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

      }, (error: any) => { //sentencias cuando ocurrio un error

        console.log('error');
        this.toastr.warning(error + '!', 'Bienvenido');
        //this.servicio.irA('/inicio');
      })
  }

  Cargar_Pedidos_Nuevos_Por_MARCA(detalle_marca: string) {
    console.log(detalle_marca);

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

      }, (error: any) => { //sentencias cuando ocurrio un error

        console.log('error');
        this.toastr.warning(error + '!', 'Bienvenido');
        //this.servicio.irA('/inicio');
      })
  }

  Cargar_Pedidos_Enviados(id: string) {

    this.servicio.Pedidos_Enviados_Listado({
      id_proveedor: id
    }) // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        console.log(data);
        if (data.length >= 1) {
          this.pedidos_enviados = data;
          console.log(this.pedidos_enviados);
        } else {
          this.pedidos_enviados = [];
          this.toastr.warning('Aun no tiene pedidos pendientes!', 'Bienvenido');
          console.log('No existen registros');
        }
      }, (error: any) => { //sentencias cuando ocurrio un error

        console.log('error');
        this.toastr.warning(error + '!', 'Bienvenido');
        //this.servicio.irA('/inicio');
      })
  }

  Cargar_Pedidos_Aceptados(id: string) {

    this.servicio.Pedidos_Aceptados_Listado({
      id_proveedor: id
    }) // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        console.log(data);
        if (data.length >= 1) {
          this.pedidos_aceptados = data;


        } else {
          this.toastr.warning('Aun no tiene pedidos aceptados!', 'Bienvenido');
          console.log('No existen registros');
        }


      }, (error: any) => { //sentencias cuando ocurrio un error

        this.toastr.warning(error + '!', 'Bienvenido');
        //this.servicio.irA('/inicio');
      })
  }

  verPedido(pedido) {
    this.mostrarEntrada = true;
    this.mostrarEnviada = false;
    console.log(pedido);
    this.pedidoSeleccionado = pedido.pedidos;
    this.descripcion = pedido.pedidos[0].DESCRIPCION;
    this.id_propuesta = pedido.pedidos[0].ID_PROPUESTA;

    this.fotos = pedido.fotos;
    console.log(this.pedidoSeleccionado[0]);
  }
  verPedidoEnviada(pedido) {
    console.log(pedido);
    this.mostrarEntrada = false;
    this.mostrarEnviada = true;
    console.log(pedido);
    this.pedidoSeleccionado = pedido.pedidos;
    this.descripcion = pedido.pedidos[0].DESCRIPCION;
    this.id_propuesta = pedido.pedidos[0].ID_PROPUESTA;

    this.fotos = pedido.fotos;
    console.log(this.pedidoSeleccionado[0]);
  }

  getTipoVehiculos() {
    this.servicio.Tipo_vehiculo() // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso

        this.Tipo_vehiculos = data.info.items;
        console.log(this.Tipo_vehiculos);


      }, (error: any) => { //sentencias cuando ocurrio un error
        this.toastr.warning(error + '!');
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
      console.log(this.forma.value.pre_envio);
      console.log(this.forma.value.pre_original);
      if (this.id_propuesta != 0) {
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
          /* this.descripcion='';
           this.fotos=[];
           this.forma.value.pre_original='';
           this.forma.value.pre_generico='';
           this.id_propuesta=0;
           this.forma.value.checkFactura= false;
           this.forma.value.checkEnvio=false;*/
        }, (error: any) => {
          this.toastr.error(error, 'Error');
        });
      } else {
        this.toastr.warning('Debe seleccionar un pedido de la bandeja de entrada!', 'Alerta');
      }

    }
  }

  clickCheckEnvio() {
    this.activar_preenvio = this.forma.value.checkEnvio;
    console.log(this.activar_preenvio);
  }

  bucarNumPedido() {
    /*buscar pedido*/
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
          this.numPedido = "";
          this.Cargar_Pedidos_Enviados(this.proveedor_id);
          this.Cargar_Pedidos_Aceptados(this.proveedor_id);



        }, (error: any) => {
          console.log('errorAceptar');


        });
    }
  }




}
