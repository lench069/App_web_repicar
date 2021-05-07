import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  //URL del servidor
  //private URL_API: string = 'http://riobytes.com/api_repicar/'; 
  private URL_API: string = 'http://192.168.100.19/api_repicar/'; 

  constructor(private router: Router,
    private http: HttpClient
   ) { }

  irA (url:string)
  {
    this.router.navigateByUrl(url);
  }

 
  //***********************PROVEEDORES INICIO******************************************/
  Proveedor_Guardar(data:any) {
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
        contrasenia: data.contrasenia
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

      //*************************PEDIDOS **********************************/
      Pedidos_Nuevos_Listado(data:any) {
        return this.http.post(
          this.URL_API + 'listar-pedidos-nuevos', 
          this.objectToFormData({id_proveedor: data.id_proveedor})
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


