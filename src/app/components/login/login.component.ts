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

  constructor(private fb: FormBuilder,
    private servicio: ServiciosService,
    private toastr:ToastrService) { 
      this.crearFormulario();

    }

  ngOnInit(): void {
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
        contrasenia: this.forma.value.contrasenia
      }).subscribe((data:any)=>{
        console.log(data);
        if(data.mensaje == 'true'){
         // this.storage.set('session_storage', data.info.item);
         localStorage.setItem('proveedor_id',this.forma.value.ci_ruc);
         this.toastr.success('Ingreso exitoso!', 'Bienvenido');
          this.servicio.irA('/dashboard_proveedor');
        }else{
          this.toastr.warning('Usuario o contraseña incorrecta!', 'Warning');
        }
      },(error:any)=>{
     
        this.toastr.error(error, 'Error');
 
      });
    }
    
  }

}
