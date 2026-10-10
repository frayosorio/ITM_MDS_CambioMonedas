import { Component, Inject } from '@angular/core';
import { Pais } from '../../../shared/entidades/pais';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Moneda } from '../../../shared/entidades/moneda';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

export interface DatosPais {
  encabezado: string;
  pais: Pais;
  monedas: Moneda[];
}

@Component({
  selector: 'app-pais-editar',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './pais-editar.component.html',
  styleUrl: './pais-editar.component.css'
})
export class PaisEditarComponent {
  
  constructor(public dialogRef: MatDialogRef<PaisEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosPais) { }


  cancelar() {
    this.dialogRef.close();
  }
}
