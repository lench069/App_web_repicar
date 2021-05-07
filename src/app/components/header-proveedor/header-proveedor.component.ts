import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-header-proveedor',
  templateUrl: './header-proveedor.component.html',
  styleUrls: ['./header-proveedor.component.css']
})
export class HeaderProveedorComponent implements OnInit {

  constructor(private servicio:ServiciosService) { }

  ngOnInit(): void {
  }

  salir()
  {
      this.servicio.irA('/inicio');
  }


}
