import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  //URL del servidor
  //private URL_API: string = 'http://riobytes.com/api_repicar/'; 
  private URL_API: string = 'http://192.168.100.19:8080/api_repicar/'; 

  constructor(private router: Router,
    private http: HttpClient
   ) { }

  irA (url:string)
  {
    this.router.navigateByUrl(url);
  }

 
  //***********************PROVEEDORES INICIO******************************************/
  Proveedor_Guardar(data:any) {
    console.log(data);
    return this.http.post(
      this.URL_API + 'registrar-proveedor', 
      this.objectToFormData({
        nombres: data.nombres,
        ci_ruc: data.ci_ruc,
        telefono: data.telefono,
        email: data.email,
        nombre_local: data.nombre_local,
        id_ciudad_f: data.id_ciudad_f,
        direccion: data.direccion,
        sector: data.sector,
       // contrasenia: data.contrasenia
      }) 
      );
  };

      //***********************Login******************************************/
      Login(data:any) {
        console.log(data);
        return this.http.post(
          this.URL_API + 'login-proveedor', 
          this.objectToFormData({
            ci_ruc: data.ci_ruc,
            contrasenia: data.contrasenia,
          }) 
          );
      }
      Login_Admin(data:any) {
        console.log(data);
        return this.http.post(
          this.URL_API + 'login-administrador', 
          this.objectToFormData({
            usuario: data.usuario,
            contrasenia: data.contrasenia,
          }) 
          );
      }

      //*************************PEDIDOS **********************************/
      Pedidos_Nuevos_Listado(data:any) {
        return this.http.post(
          this.URL_API + 'listar-pedidos-nuevos', 
          this.objectToFormData({id_proveedor: data.id_proveedor})
          );
      }
      Pedidos_Nuevos_Listado_Por_TipoV(data:any) {
        return this.http.post(
          this.URL_API + 'listar-pedidos-nuevos_por_TipoV', 
          this.objectToFormData({
            id_proveedor: data.id_proveedor,
            detalle_tipov: data.detalle_tipov
          })
          );
      }
      Pedidos_Nuevos_Listado_Por_Marca(data:any) {
        return this.http.post(
          this.URL_API + 'listar-pedidos-nuevos_por_Marca', 
          this.objectToFormData({
            id_proveedor: data.id_proveedor,
            detalle_tipov: data.detalle_tipov,
            detalle_marca: data.detalle_marca
          })
          );
      }
      Pedidos_Nuevos_Listado_Por_Termino(data:any) {
        return this.http.post(
          this.URL_API + 'listar-pedidos-nuevos_por_Termino', 
          this.objectToFormData({
            id_proveedor: data.id_proveedor,
            termino: data.termino
          })
          );
      }
      Pedidos_Enviados_Listado(data:any) {
        return this.http.post(
          this.URL_API + 'listar-pedidos-enviados', 
          this.objectToFormData({id_proveedor: data.id_proveedor})
          );
      }
      Pedidos_Aceptados_Listado(data:any) {
        return this.http.post(
          this.URL_API + 'listar-pedidos-aceptados', 
          this.objectToFormData({id_proveedor: data.id_proveedor})
          );
      }
      Pedidos_Finalizados_Listado(data:any) {
        return this.http.post(
          this.URL_API + 'listar-pedidos-finalizados', 
          this.objectToFormData({id_proveedor: data.id_proveedor})
          );
      }
      pedido_consultar(data){
      return this.http.post(
        this.URL_API + 'consultar-cod-pedido/'+data.numPedido, 
        this.objectToFormData({id_proveedor: data.proveedor_id}) 
        );
    }

      //**************************PROPUESTA */
      Proveedor_Cotiza_Propuesta(data:any) {
        console.log(data);
        return this.http.post(
          this.URL_API + 'cotizar-propuesta/'+data.id_propuesta, 
          this.objectToFormData({
            estado: data.estado,
            p_original: data.p_original,
            p_generico:data.p_generico,
            factura:data.factura,
            envio:data.envio,
            p_envio:data.p_envio, //Areglar por que no va el valor de cero
            p_original_com:data.p_original_com,
            p_generico_com:data.p_generico_com
    
          }) 
          );
      };
      //****************TIPO VEHICULO */

      Tipo_vehiculo() {
        return this.http.get(
          this.URL_API + 'listado-tipo-vehiculo' 
          );
      };
      //**************MARCA**************/
      Marcas_Tipov(id_tipov:number) {
        return this.http.get(
          this.URL_API + 'marcas-tipov/'+id_tipov, 
          );
      };

      //**********CARgar Privincaias */
      Provincias_por_pais(data) {
        return this.http.get(
          this.URL_API + 'provincias-pais/'+data.id_pais , 
          );
      };
       //***********************CIUDAD INICIO******************************************/
    Ciudades_por_provincia(data) {
      return this.http.get(
        this.URL_API + 'ciudades-provincia/'+data.id_provincia, 
        );
    };
    //*******PROVEEDORES*************/
    Proveedores_Listado() {
      return this.http.get(
        this.URL_API + 'listar-proveedores'
        );
    }
  
   //esta funcion es usada para formatear los parametros.
   objectToFormData(obj: any, form?: any, namespace?: any) {
    let fd: any = form || new FormData();
    let formKey: any;
    for (let property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        }
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }

      }
    }
    return fd;
  };
}


