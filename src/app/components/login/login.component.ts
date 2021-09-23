import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['/src/assets/login_registro/css/style.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  public flagCambioContra:boolean = false;
  public type:string='password';

  constructor(private fb: FormBuilder,
    private servicio: ServiciosService,
    private toastr:ToastrService) { 
      this.crearFormulario();

    }

  ngOnInit(): void {
  }

  mostrarContra()
  {
    this.type = this.servicio.verContraseña(this.type);
  }
 
  get ci_rucNoValido() {
    return this.forma.get('ci_ruc').invalid && this.forma.get('ci_ruc').touched
  }

  get contraseniaNoValido() {
    return this.forma.get('contrasenia').invalid && this.forma.get('contrasenia').touched
  }

  crearFormulario() {

    this.forma = this.fb.group({
      ci_ruc: ['', [Validators.required, Validators.minLength(5) ] ],
      contrasenia: ['', [Validators.required ] ]
    });

  }

  Login()
  {
    if ( this.forma.invalid ) {
      console.log('invalido');
      return Object.values( this.forma.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
        
        
      });
     
    }else{
   
      this.servicio.Login({
        ci_ruc: this.forma.value.ci_ruc,
        contrasenia: this.servicio.encriptarContraseña(this.forma.value.contrasenia)
      }).subscribe((data:any)=>{
        console.log(data);
        if(data.mensaje == 'Ingreso exitoso'){
         // this.storage.set('session_storage', data.info.item);
         localStorage.setItem('proveedor_id',this.forma.value.ci_ruc);
         this.tieneCambioContra(this.forma.value.ci_ruc).then((repuesta: any) => {
            console.log(repuesta);
            if(repuesta.mensaje == 'true'){
              this.servicio.irA('/cambio_contraseña');
            }else{
              this.toastr.success(data.mensaje + '!', 'Bienvenido');
              this.servicio.irA('/dashboard_proveedor');
            }

          });
   
        }else{
          this.toastr.warning(data.mensaje + '!', 'Warning');
        }
      },(error:any)=>{
     
        this.toastr.error(error, 'Error');
 
      });
    }
    
  }

  tieneCambioContra(proveedor_id:string){
   return this.servicio.verificarCambioContra({
      ci_ruc: proveedor_id
    }).toPromise();
  }

}
