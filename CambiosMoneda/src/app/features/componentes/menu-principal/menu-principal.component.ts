import { Component, OnInit } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    RouterModule,
    NgFor,
    NgIf
  ],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent implements OnInit {

  public opciones=[
    { titulo: 'Monedas', url: 'monedas', icono: 'assets/iconos/Monedas.png' },
    { titulo: 'Paises', url: 'paises', icono: 'assets/iconos/Paises.png' },
    { titulo: 'Cambios', url: 'cambios', icono: 'assets/iconos/Cambios.png' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
