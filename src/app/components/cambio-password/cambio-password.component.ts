import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';


@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['/src/assets/login_registro/css/style.css']
})
export class CambioPasswordComponent implements OnInit {

  forma: FormGroup;
  public contraCoinciden:boolean = true;
  public proveedor_id: string = '';
  public pass:string = '';
  public type:string='password';
  public typeRep:string='password';

  constructor(private fb: FormBuilder,
    private servicio: ServiciosService,
    private toastr:ToastrService) { 
      this.crearFormulario();

    }

  ngOnInit(): void {
    this.proveedor_id = localStorage.getItem('proveedor_id');
    console.log('cambio contraseña id_cliente: '+this.proveedor_id);
  }

  get contraNuevaNoValido() {
    return this.forma.get('contraNueva').invalid && this.forma.get('contraNueva').touched
  }

  get contraRepNoValido() {
    return this.forma.get('contraRep').invalid && this.forma.get('contraRep').touched
  }

  crearFormulario() {

    this.forma = this.fb.group({
      contraNueva: ['', [Validators.required, Validators.minLength(6),Validators.pattern('((?=.*\d)(?=.*[a-zA-Z]).{4,20})') ] ],
      contraRep: ['', [Validators.required] ]
    });

  }

  cambioPass()
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
        if(this.forma.value.contraRep == this.forma.value.contraNueva)
        {

          this.servicio.cambiarContrasenia({
            ci_ruc: this.proveedor_id,
            newContraseña: this.servicio.encriptarContraseña(this.forma.value.contraNueva)
          }).subscribe((data:any)=>{
            console.log(data);
            if(data.flag == 'true'){
             // this.storage.set('session_storage', data.info.item);
             this.toastr.success(data.mensaje + '!', 'Correcto');
              this.servicio.irA('/login');
            }else{
              this.toastr.warning(data.mensaje + '!', 'Alerta');
              this.servicio.irA('/login');
            }
          },(error:any)=>{
         
            this.toastr.error(error, 'Error');
     
          });

        }else{
          this.contraCoinciden = false;
        }
    }
    
  }
  mostrarContra()
  {
    this.type = this.servicio.verContraseña(this.type);
  }
  mostrarContraRep()
  {
    this.typeRep = this.servicio.verContraseña(this.typeRep);
  }
}
