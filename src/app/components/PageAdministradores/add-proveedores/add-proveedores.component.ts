import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import  Swal  from 'sweetalert2'; 

@Component({
  selector: 'app-add-proveedores',
  templateUrl: './add-proveedores.component.html',
  styleUrls: ['./add-proveedores.component.css']
})
export class AddProveedoresComponent implements OnInit {
  public menuDashboard:boolean = false;
  public menuEditar:boolean = false;
  public menuProveedores:boolean = true;
  public menuConfiguracion:boolean = false;
  forma: FormGroup;
  public id_pais:number = 1;
  public provincias:[] = [];
  public id_provincia:number = 0;
  public id_ciudad:number = 0;
  public ciudades:[] = [];

  constructor( private fb: FormBuilder,
    private servicio: ServiciosService,
    private toastr:ToastrService ) { 
      this.crearFormulario();

    }

  ngOnInit(): void {
    this.cargarProvincias();
  }

  irMenuDashboard()
  {
    console.log("dashboard");
    this.menuDashboard= true;
    this.menuEditar= false;
    this.menuConfiguracion= false;
    this.menuProveedores=false;
    this.servicio.irA('/dashboard_administrador');
    
  }

  irMenuEditar()
  {
    console.log("dashboard");
    this.menuDashboard= false;
    this.menuEditar= true;
    this.menuConfiguracion= false;
    this.menuProveedores=false;
   // this.servicio.irA('/admin_proveedores');
    
  }

  irMenuProveedores()
  {
    console.log("proveedores");
    this.menuDashboard= false;
    this.menuEditar= false;
    this.menuConfiguracion= false;
    this.menuProveedores=true;
    this.servicio.irA('/add-proveedores');
    
  }
  irMenuConfiguracion()
  {
    console.log("configuraciones");
    this.menuDashboard= false;
    this.menuEditar= false;
    this.menuConfiguracion= true;
    this.menuProveedores=false;
    //this.servicio.irA('/admin_proveedores');
    
  }

  irMenuAdminProveedores()
  {
    console.log("admin proveedores");
    this.menuDashboard= false;
    this.menuEditar= false;
    this.menuConfiguracion= false;
    this.menuProveedores=true;
    this.servicio.irA('/admin-proveedores');
    
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
  /*get contraseniaNoValido() {
    return this.forma.get('contrasenia').invalid && this.forma.get('contrasenia').touched
  }*/

  crearFormulario() {

    this.forma = this.fb.group({
      nombres  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      ci_pass: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(12) ] ],
      telefono: ['', [Validators.required, Validators.minLength(10) ] ],
      correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      nombre_local: ['', [Validators.required ] ],
      ciudad: ['', [Validators.required ] ],
      direccion: ['', [Validators.required ] ],
      sector: ['', [Validators.required ] ],
     // contrasenia: ['', [Validators.required ] ]    
    });

  }

  cargarProvincias() {
    this.servicio.Provincias_por_pais({id_pais:this.id_pais})
      .subscribe((data:any)=>{
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.info.items.length > 0)
        {
          this.provincias = data.info.items;
          
        }else{
       
          this.toastr.error('Error!', 'El pais seleccionado no tiene provincias asociadas.');
        }   
      },(error:any)=>{
          this.toastr.error('Error!', 'No se pudo realizar la peticion.');
      });
    }

    Cargar_Ciudades(id_provincia:number)
  {
    this.ciudades = [];
    this.id_provincia = id_provincia;
    if(this.id_provincia != 0)
    {
      this.servicio.Ciudades_por_provincia({id_provincia:this.id_provincia})
      .subscribe((data:any)=>{
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.info.items.length > 0)
        {
          this.ciudades = data.info.items;
        }else{
          this.toastr.error('Error!', 'La provincia seleccionada no tiene ciudades asociadas.');
        }
        
      },(error:any)=>{
          this.toastr.error('Error!', 'No se pudo realizar la peticion.');
      });
    }
  }

  Guardar() {
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
      this.servicio.Proveedor_Guardar({
        nombres:this.forma.value.nombres,
        ci_ruc:this.forma.value.ci_pass,
        telefono:this.forma.value.telefono,
        email:this.forma.value.correo,
        nombre_local:this.forma.value.nombre_local,
        id_ciudad_f:this.forma.value.ciudad,
        direccion: this.forma.value.direccion,
        sector: this.forma.value.sector,
      //  contrasenia: this.forma.value.contrasenia
      }).subscribe((data:any)=>{
          this.toastr.success('', 'EL proveedor se registro corectamente');
          this.forma.reset({     
          });

      },(error:any)=>{
        this.toastr.error('Error!', 'No se pudo realizar la peticion, compruebe su conexion a internet');
      });
    }
  }

}
