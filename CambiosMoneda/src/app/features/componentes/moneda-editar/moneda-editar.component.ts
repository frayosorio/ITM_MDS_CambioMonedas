import { Component, Inject } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { Moneda } from '../../../shared/entidades/moneda';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

export interface DatosMoneda {
  encabezado: string;
  moneda: Moneda;
}

@Component({
  selector: 'app-moneda-editar',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    FormsModule
  ],
  templateUrl: './moneda-editar.component.html',
  styleUrl: './moneda-editar.component.css'
})
export class MonedaEditarComponent {

  constructor(public dialogRef: MatDialogRef<MonedaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosMoneda) { }


  cancelar() {
    this.dialogRef.close();
  }

}
