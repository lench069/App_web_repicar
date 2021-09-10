import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import  Swal  from 'sweetalert2'; 

@Component({
  selector: 'app-olvide-password',
  templateUrl: './olvide-password.component.html',
  styleUrls: ['/src/assets/login_registro/css/style.css']
})
export class OlvidePasswordComponent implements OnInit {

  forma: FormGroup;
  public contraCoinciden:boolean = true;
  public proveedor_id: string = '';
  public pass_temp:string;

  constructor(private fb: FormBuilder,
    private servicio: ServiciosService,
    private toastr:ToastrService) { 
      this.crearFormulario();

    }

  ngOnInit(): void {
    
  }

  get cedulaNoValido() {
    return this.forma.get('ci_ruc').invalid && this.forma.get('ci_ruc').touched
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  crearFormulario() {

    this.forma = this.fb.group({
      ci_ruc: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(13) ] ],
      correo: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
    });

  }

  olvidePass()
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

          this.pass_temp = this.servicio.generarContraseña();
          this.servicio.olvideContrasenia({
            ci_ruc: this.forma.value.ci_ruc,
            correo: this.forma.value.correo,
            pass_temp: this.pass_temp
          }).subscribe((data:any)=>{
            console.log(data);
            if(data.flag == 'true'){
             // this.storage.set('session_storage', data.info.item);
             this.toastr.success(data.mensaje + '!', 'Correcto');
             Swal.fire('Se envio una clave temporal a su correo!');
              this.servicio.irA('/login');
            }else{
              this.toastr.warning(data.mensaje + '!', 'Alerta');
            }
          },(error:any)=>{
         
            this.toastr.error(error, 'Error');
     
          });
    }
    
  }

}
