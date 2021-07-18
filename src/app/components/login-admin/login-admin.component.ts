import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: []
})
export class LoginAdminComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder,
    private servicio: ServiciosService,
    private toastr:ToastrService) { 
      this.crearFormulario();
    }

  ngOnInit(): void {
  }

  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }

  get contraseniaNoValido() {
    return this.forma.get('contrasenia').invalid && this.forma.get('contrasenia').touched
  }

  crearFormulario() {

    this.forma = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(5) ] ],
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
      this.servicio.Login_Admin({
        usuario: this.forma.value.usuario,
        contrasenia: this.forma.value.contrasenia
      }).subscribe((data:any)=>{
        console.log(data);
        if(data.mensaje == 'true'){
         // this.storage.set('session_storage', data.info.item);
         localStorage.setItem('admin_id',this.forma.value.ci_ruc);
         this.toastr.success('Ingreso exitoso!', 'Bienvenido');
          this.servicio.irA('/admin-proveedores');
        }else{
          this.toastr.warning('Usuario o contraseña incorrecta!', 'Warning');
          this.forma.value.usuario = '';
          this.forma.value.contrasenia = '';
        }
      },(error:any)=>{
     
        this.toastr.error(error, 'Error');
 
      });
    }
    
  }
}
