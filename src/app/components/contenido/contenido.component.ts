import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastNoAnimationModule, ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
//spinner
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder,private servicio: ServiciosService,
    private toastr:ToastrService,private spinner: NgxSpinnerService) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario() {

    this.forma = this.fb.group({
      nombre  : ['', [ Validators.required ]  ],
      correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      asunto: ['', [Validators.required ] ],
      mensaje: ['', [Validators.required ] ]
    });

  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get asuntoNoValido() {
    return this.forma.get('asunto').invalid && this.forma.get('asunto').touched
  }
  get mensajeNoValido() {
    return this.forma.get('mensaje').invalid && this.forma.get('mensaje').touched
  }


  enviar(){
    console.log( this.forma );

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
      this.spinner.show();
      this.servicio.contactanos_enviar({
        nombre:this.forma.value.nombre,
        correo:this.forma.value.correo,
        asunto:this.forma.value.asunto,
        mensaje:this.forma.value.mensaje
      }).subscribe((data:any)=>{
        console.log(data);
        if(data.envio == 'true')
        {
          this.toastr.success('', data.mensaje);
        }else{
          this.toastr.error('', data.mensaje);
        }
        this.spinner.hide();
          
          this.forma.reset({
            
          });

      },(error:any)=>{
        this.toastr.error( 'No se pudo enviar el mensaje, compruebe su conexion a internet');
        this.spinner.hide();
      });

    }
  }

}
