import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ventas-proveedor',
  templateUrl: './ventas-proveedor.component.html',
  styleUrls: ['./ventas-proveedor.component.css']
})
export class VentasProveedorComponent implements OnInit {
  
  public proveedor_id: string = '';
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

  constructor(private servicio: ServiciosService,private toastr: ToastrService,public route:ActivatedRoute) { 

    this.proveedor_id = this.route.snapshot.params.ci_ruc;
  }

  ngOnInit(): void {
    this.Cargar_Total_Ventas(this.proveedor_id);
    this.consultarProveedor();
   
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
           this.cargarLicencias();
           this.cantidad_total = 3;
           this.recargo_total = this.selectPublicidad.PRECIO + this.selectLicencia.VALOR + (this.total_ventas.TOTAL_ORIGINAL_COM - this.total_ventas.TOTAL_ORIGINAL);
           this.precio_total = this.selectPublicidad.PRECIO + this.selectLicencia.VALOR + this.total_ventas.TOTAL_ORIGINAL_COM ;
           console.log(this.cantidad_total);
           console.log(this.recargo_total);
           console.log(this.precio_total);
     
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
