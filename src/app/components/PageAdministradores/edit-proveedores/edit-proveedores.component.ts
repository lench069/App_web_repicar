import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-edit-proveedores',
  templateUrl: './edit-proveedores.component.html',
  styleUrls: ['./edit-proveedores.component.css']
})
export class EditProveedoresComponent implements OnInit {

  forma: FormGroup;
  public id_pais:number = 1;
  public provincias:[] = [];
  public id_provincia:number = 0;
  public id_ciudad:number = 0;
  public ciudades:[] = [];
  public id_proveedor:string='';
  public nombre_local:string='';
  public ciudad:string='';
  public provincia:string='';
  public nombres:string='';
  public email:string='';
  public telefono:string='';
  public sector:string='';
  public direccion:string='';
  public estado:number=null;
  public estados:string[]=[];
  constructor( private fb: FormBuilder,
    public servicio: ServiciosService,
    private toastr:ToastrService,public route:ActivatedRoute, ) { 

      this.id_proveedor = this.route.snapshot.params.ci_ruc;
      this.consultarProveedor();
     

    }

  ngOnInit(): void {
 
    this.listarEstados();
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
 
  get direccionNoValido() {
    return this.forma.get('direccion').invalid && this.forma.get('direccion').touched
  }

  get sectorNoValido() {
    return this.forma.get('sector').invalid && this.forma.get('sector').touched
  }

  crearFormulario() {
console.log("crear formulario");
    this.forma = this.fb.group({
      nombres  : [this.nombres, [ Validators.required, Validators.minLength(5) ]  ],
      ci_pass: [this.id_proveedor, [Validators.required, Validators.minLength(10),Validators.maxLength(12) ] ],
      telefono: [this.telefono, [Validators.required, Validators.minLength(10) ] ],
      correo  : [this.email, [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      nombre_local: [this.nombre_local, [Validators.required ] ],
      direccion: [this.direccion, [Validators.required ] ],
      sector: [this.sector, [Validators.required ] ],
      estado: [this.estado, [Validators.required ] ],
     // contrasenia: ['', [Validators.required ] ]    
    });

  }

  listarEstados() {
    this.servicio.listar_estados()
      .subscribe((data:any)=>{
        console.log(data);
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.length > 0)
        {
          this.estados = data;        
        }else{
       
          this.toastr.error('Error!', 'El pais seleccionado no tiene provincias asociadas.');
        }   
      },(error:any)=>{
          this.toastr.error('Error!', 'No se pudo realizar la peticion.');
      });
    }


  Editar() {
    console.log( "gg" );

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
      console.log(this.forma.value.estado);
      this.servicio.Proveedor_Editar({
        id_proveedor:this.id_proveedor,
        nombres:this.forma.value.nombres,
        telefono:this.forma.value.telefono,
        email:this.forma.value.correo,
        nombre_local:this.forma.value.nombre_local,
        direccion: this.forma.value.direccion,
        sector: this.forma.value.sector,
        estado:this.forma.value.estado
      //  contrasenia: this.forma.value.contrasenia
      }).subscribe((data:any)=>{
          this.toastr.success('', 'EL proveedor se edito corectamente');
        /*  this.forma.reset({     
          });*/

      },(error:any)=>{
        this.toastr.error('Error!', 'No se pudo realizar la peticion, compruebe su conexion a internet');
      });
    }
  }

  consultarProveedor()
  {
    console.log("consultar");
    if(this.id_proveedor != '')
    {
      this.servicio.proveedor_consultar({id_proveedor : this.id_proveedor})
      .subscribe((data:any)=>{
        console.log(data);
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.proveedor.CI_RUC != '')
        {
          
          this.nombre_local = data.proveedor.NOMBRE_LOCAL;
          this.ciudad = data.proveedor.NOMBRE_C;
          this.provincia = data.proveedor.NOMBRE_PRO;
          this.nombres = data.proveedor.NOMBRES;
          this.email = data.proveedor.EMAIL;
          this.telefono = data.proveedor.TELEFONO;
          this.sector = data.proveedor.SECTOR;
          this.direccion = data.proveedor.DIRECCION;
          this.estado = data.proveedor.ESTADO;
          this.crearFormulario();
          console.log(this.estado);

          this.toastr.success(data.mensaje+'!');
          
        }else{

         this.toastr.error('El proveedor que desea consultar no existe.');
         this.servicio.irA('/admin-proveedores');
          
        }
        
      },(error:any)=>{
          this.toastr.error('No se pudo realizar la peticion.');
          this.servicio.irA('/admin-proveedores');

      });
    }
  }

}
