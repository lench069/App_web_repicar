import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';



@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  //URL del servidor
  //private URL_API: string = 'http://riobytes.com/api_repicar/'; 
  private URL_API: string = 'http://192.168.100.19:8080/api_repicar/'; 
  //private URL_API: string = 'http://192.168.88.5:8080/api_repicar/'; 

  public DataKey = CryptoJS.enc.Utf8.parse("01234567890123456789012345678901"); // 32 bytes
  public DataVector = CryptoJS.enc.Utf8.parse("1234567890123412"); // 16 bytes

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

  cambiarContrasenia(data:any) {
    console.log(data);
    return this.http.post(
      this.URL_API + 'cambiar-contrasenia', 
      this.objectToFormData({
        ci_ruc: data.ci_ruc,
        new_contrasenia: data.newContraseña
      }) 
      );
  }
  olvideContrasenia(data:any) {
    console.log(data);
    return this.http.post(
      this.URL_API + 'olvide-contrasenia', 
      this.objectToFormData({
        ci_ruc: data.ci_ruc,
        correo: data.correo,
        pass_temp: data.pass_temp
      }) 
      );
  }

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

      verificarCambioContra(data:any) {
        console.log(data);
        return this.http.post(
          this.URL_API + 'verificar-cambio-contrasenia', 
          this.objectToFormData({
            ci_ruc: data.ci_ruc
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
    Pedidos_Total_Ventas(data:any) {
      return this.http.post(
        this.URL_API + 'total-ventas', 
        this.objectToFormData({id_proveedor: data.id_proveedor})
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
            p_envio:data.p_envio == 0 ? '0' : data.p_envio,//Areglar por que no va el valor de cero
            p_original_com:data.p_original_com,
            p_generico_com:data.p_generico_com
    
          }) 
          );
      };
      Proveedor_EditarCotiza_Propuesta(data:any) {
        console.log(data);
        return this.http.post(
          this.URL_API + 're-cotizar-propuesta/'+data.id_propuesta, 
          this.objectToFormData({
            p_original: data.p_original,
            p_generico:data.p_generico,
            factura: data.factura == false ? '0' : 1,
            envio: data.envio == false ? '0' : 1,
            p_envio:data.p_envio == 0 ? '0' : data.p_envio,//Areglar por que no va el valor de cero
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
     proveedor_consultar(data)
     {
       return this.http.get(
         this.URL_API + 'consultar-proveedor/'+data.id_proveedor , 
         );
     }
     Proveedor_Editar(data:any) {
      console.log(data);
      return this.http.post(
        this.URL_API + 'editar-proveedor/'+data.id_proveedor , 
        this.objectToFormData({
          nombres: data.nombres,
          telefono: data.telefono,
          email: data.email,
          nombre_local: data.nombre_local,
          direccion: data.direccion,
          sector: data.sector,
          estado:data.estado,
         contrasenia: data.contrasenia
        }) 
        );
    };
     //**********ESTADOS**************/
     listar_estados() {
      return this.http.get(
        this.URL_API + 'listar-estados'
        );
    }

    //**********Publicidades**************/
    Publicidad_TipoListado() {
      return this.http.get(
        this.URL_API + 'listar-tipopublicidad'
        );
    }
    //**********LIcecnias**************/
    Licencias_Listado() {
      return this.http.get(
        this.URL_API + 'listar-licencias'
        );
    }
      //**********Comisiones**************/
      Comisiones_Listado() {
        return this.http.get(
          this.URL_API + 'listar-comisiones'
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

  generarContraseña()
  {
      let result = "";
      const abc = "a b c d e f g h i j k l m n o p q r s t u v w x y z".split(" "); // Espacios para convertir cara letra a un elemento de un array
      for(let i=1;i<=6;i++) {
        if (abc[i]) { // Condicional para prevenir errores en caso de que longitud sea mayor a 26
          const random = Math.floor(Math.random() * 4); // Generaremos el número
          const random2 = Math.floor(Math.random() * abc.length); // Generaremos el número
          const random3 = Math.floor(Math.random() * abc.length + 3); // Generaremos el número
          if (random == 1) {
            result += abc[random2]
          } else if (random == 2) {
            result += random3 + abc[random2]
          } else {
            result += abc[random2].toUpperCase()
          }
        }
      }
      console.log(result);
      return result;
      
  }

  encriptarContraseña(contraseña)
  {
     return CryptoJS.AES.encrypt(contraseña, this.DataKey,{ iv: this.DataVector }).toString();
  }

  verContraseña(type:string)
  {
    if(type == 'password')
    {
      type = 'text';
    }else{
      type = 'password';
    }
    return type;
   
  }

  //Contactanos
  contactanos_enviar(data:any) {
    return this.http.post(
      this.URL_API + 'contactanos-enviar', 
      this.objectToFormData({
        nombre: data.nombre,
        correo: data.correo,
        asunto: data.asunto,
        mensaje: data.mensaje
      }) 
      );
  }

  //Enviar notificaciones
  push_notificacion(data:any) {
    console.log(data);
    return this.http.post(
      this.URL_API + 'push-notificacion/'+data.id_cliente, 
      this.objectToFormData({
        titulo: data.titulo,
        desc: data.desc,
        token: data.token
      }) 
      );

  }
}


