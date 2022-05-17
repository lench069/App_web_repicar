import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ActivatedRoute } from '@angular/router';
//spinner
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-ventas-proveedor',
  templateUrl: './ventas-proveedor.component.html',
  styleUrls: ['./ventas-proveedor.component.css']
})
export class VentasProveedorComponent implements OnInit {
  
  public proveedor_id: string = '';

  constructor(private servicio: ServiciosService,private toastr: ToastrService,public route:ActivatedRoute,private spinner: NgxSpinnerService ) { 

    this.proveedor_id = this.route.snapshot.params.ci_ruc;
  }

  ngOnInit(): void {
       
  }

}
