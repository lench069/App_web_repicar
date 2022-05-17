import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ConfiguracionesComponent } from '../PageAdministradores/configuraciones/configuraciones.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-mis-ventas',
  templateUrl: './mis-ventas.component.html',
  styleUrls: ['./mis-ventas.component.css']
})
export class MisVentasComponent implements OnInit {

  public pedidos_finalizados: any = [];
  public proveedor_id: string = '';
  public fecha_inicial:string='';
  public fecha_final:string='';
  
  
  constructor(private servicio: ServiciosService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.proveedor_id = localStorage.getItem('proveedor_id');
    this.Cargar_Pedidos_Finalizados(this.proveedor_id);
  }

  Cargar_Pedidos_Finalizados(id: string) {

    this.servicio.Pedidos_Finalizados_Listado({
      id_proveedor: id
    }) // llamado al servicio
      .subscribe((data: any) => {   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
        console.log(data);
        if (data.length >= 1) {
          this.pedidos_finalizados = data[0].finalizados;
          this.fecha_inicial = data[0].fecha_ini;
          this.fecha_final = data[0].fecha_fin;
          console.log(this.pedidos_finalizados);
          console.log(this.fecha_inicial);
          console.log(this.fecha_final);
        } else {
          this.toastr.warning('Aun no tienes ventas concretadas!', 'Aviso');
        }
      }, (error: any) => { //sentencias cuando ocurrio un error

        this.toastr.warning(error + '!', 'Error');
        //this.servicio.irA('/inicio');
      })
      
      setTimeout(function(){
        $('#DTventas').DataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }
        });
    }, 1000);
  }

  
  createPDF(){
 
    const pdfDefinition: any = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
    
            body: [
              [ 'First', 'Second', 'Third', 'The last one' ],
              [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
              [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
            ]
          }
        }
      ]
    }
 
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
 
  }

}
