import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ConfiguracionesComponent } from '../PageAdministradores/configuraciones/configuraciones.component';

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
  public tipo_publicidad:any=null;
  public proveedor:any=null;
  public selectPublicidad:any={
    'ID_TIPO_PUBLICIDAD':'',
    'DESCRIPCION':'',
    'PRECIO':''
  };
  public licencias:any=null;
  public selectLicencia:any={
    'ID_LICENCIA':'',
    'DESCRIPCION':'',
    'VALOR':''
  };
  public total_ventas:any={
    'TOTAL':'',
    'TOTAL_ORIGINAL':'',
    'TOTAL_ORIGINAL_COM':''
  };
  public total:any=null;
  public cantidad_total:number=0;
  public recargo_total:number=0;
  public precio_total:number=0;


  constructor(private servicio: ServiciosService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.proveedor_id = localStorage.getItem('proveedor_id');
    this.Cargar_Pedidos_Finalizados(this.proveedor_id);
    this.Cargar_Total_Ventas(this.proveedor_id);
    this.consultarProveedor();
    
    
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
      
      setTimeout(function(){
        $('#DTventas').DataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }
        });
    }, 1000);
  }

  cargarPublicidad()
  {
    this.servicio.Publicidad_TipoListado() // llamado al servicio
    .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
      if (data.info.items.length >= 1) {
        this.tipo_publicidad = data.info.items; 
        console.log(this.tipo_publicidad);
        for (let i=0;i<this.tipo_publicidad.length;i++)
        {

           if(this.tipo_publicidad[i].ID_TIPO_PUBLICIDAD == this.proveedor.TIPO_PUBLICIDAD)
           {
              this.selectPublicidad = this.tipo_publicidad[i];
              console.log(this.selectPublicidad);

           }
        }
         this.cargarLicencias();             
      } else {
        this.toastr.warning('No existen publicidades!', 'Aviso');
      }
    }, (error: any) => { //sentencias cuando ocurrio un error

      this.toastr.warning(error + '!', 'Error');
      //this.servicio.irA('/inicio');
    })
  }

  consultarProveedor()
  {
    console.log("consultar");
    if(this.proveedor_id != '')
    {
      this.servicio.proveedor_consultar({id_proveedor : this.proveedor_id})
      .subscribe((data:any)=>{
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.proveedor.CI_RUC != '')
        {
          
         this.proveedor = data.proveedor;
            if(this.proveedor != {})
                {
                  this.cargarPublicidad();
                }
        }else{

         this.toastr.error('El proveedor que desea consultar no existe.');    
        }   
      },(error:any)=>{
          this.toastr.error('No se pudo realizar la peticion.');
      });
    }
  }

  cargarLicencias()
  {
    this.servicio.Licencias_Listado() // llamado al servicio
    .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
      console.log(data);
      if (data.info.items.length >= 1) {
        this.licencias = data.info.items; 
        for (let i=0;i<this.licencias.length;i++)
        {
           if(this.licencias[i].ID_LICENCIA == this.proveedor.LICENCIA)
           {
              this.selectLicencia = this.licencias[i];
              console.log(this.selectLicencia);

           }
        }
        //TOTALES A MOSTRAR EN LA TABLA A PAGAR
        this.cantidad_total = this.total_ventas.VENTAS;
        this.recargo_total = this.total_ventas.TOTAL_ORIGINAL_COM - this.total_ventas.TOTAL_ORIGINAL;
        console.log(this.selectPublicidad);
        this.precio_total = parseFloat(this.selectPublicidad.PRECIO) + parseFloat(this.selectLicencia.VALOR) + this.recargo_total;
        console.log(this.cantidad_total);
        console.log(this.recargo_total);
        console.log(this.precio_total);
      } else {
        this.toastr.warning('No existen licencias!', 'Aviso');
      }
    }, (error: any) => { //sentencias cuando ocurrio un error

      this.toastr.warning(error + '!', 'Error');
      //this.servicio.irA('/inicio');
    })
  }

  Cargar_Total_Ventas(id: string) {

    this.servicio.Pedidos_Total_Ventas({
      id_proveedor: id
    }) // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        
        this.total_ventas = data[0];
        console.log(this.total_ventas);
        
      }, (error: any) => { //sentencias cuando ocurrio un error

        this.toastr.warning(error + '!', 'Error');
        //this.servicio.irA('/inicio');
      })
  }

  sumarTotales() {
 
    /** sumamos las filas **/
 
    // obtenemos todas las filas del tbody
    const filas=document.querySelectorAll("#myTable tbody tr");
 
    // bucle por cada una de las filas
    filas.forEach((fila) => {
 
        // obtenemos los tds de cada fila
        const tds=fila.querySelectorAll("td");
 
        let total=0;
 
        // bucle por cada uno de los tds con excepcion el primero (producto) y ultimo (total)
        for(let i=1; i<tds.length-1; i++) {
 
            // sumamos los tds
            total+=parseFloat(tds[i].innerHTML);
            
        }
 
    });
   
  }

}
