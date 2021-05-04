import { Component, OnInit } from '@angular/core';

import { ServiciosService } from 'src/app/services/servicios.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-registro-proveedor',
  templateUrl: './registro-proveedor.component.html',
  styleUrls: ['/src/assets/login_registro/css/style.css']
})
export class RegistroProveedorComponent implements OnInit {  forma: FormGroup;


  constructor( private fb: FormBuilder,
               private servicio: ServiciosService ) { 

    this.crearFormulario();
 
 

  }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.forma.get('nombres').invalid && this.forma.get('nombres').touched
  }

  get cedulaNoValido() {
    return this.forma.get('ci_pass').invalid && this.forma.get('ci_pass').touched
  }
  get telefonoNoValido() {
    return this.forma.get('telefono').invalid && this.forma.get('telefono').touched
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }
  get nombre_localNoValido() {
    return this.forma.get('nombre_local').invalid && this.forma.get('nombre_local').touched
  }
  get ciudadNoValido() {
    return this.forma.get('ciudad').invalid && this.forma.get('ciudad').touched
  }

  get direccionNoValido() {
    return this.forma.get('direccion').invalid && this.forma.get('direccion').touched
  }

  get sectorNoValido() {
    return this.forma.get('sector').invalid && this.forma.get('sector').touched
  }
  get contraseniaNoValido() {
    return this.forma.get('contrasenia').invalid && this.forma.get('contrasenia').touched
  }


  crearFormulario() {

    this.forma = this.fb.group({
      nombres  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      ci_pass: ['', [Validators.required, Validators.minLength(5) ] ],
      telefono: ['', [Validators.required, Validators.minLength(10) ] ],
      correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      nombre_local: ['', [Validators.required ] ],
      ciudad: ['', [Validators.required ] ],
      direccion: ['', [Validators.required ] ],
      sector: ['', [Validators.required ] ],
      contrasenia: ['', [Validators.required ] ]
    });

  }

 


  Guardar() {
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
      this.servicio.Proveedor_Guardar({
        nombres:this.forma.value.nombres,
        ci_ruc:this.forma.value.ci_pass,
        telefono:this.forma.value.telefono,
        email:this.forma.value.email,
        nombre_local:this.forma.value.nombre_local,
        id_ciudad_f:this.forma.value.ciudad,
        direccion: this.forma.value.direccion,
        sector: this.forma.value.sector,
        contrasenia: this.forma.value.contrasenia
      }).subscribe((data:any)=>{
          console.log('se registro');

      },(error:any)=>{
          
      });
    }

  }

}
