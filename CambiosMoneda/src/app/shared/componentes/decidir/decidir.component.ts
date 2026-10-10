import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReferenciasMaterialModule } from '../../modulos/referencias-material.module';

export interface DatosDecision {
  titulo: string;
  mensaje: string;
  id: number;
}

@Component({
  selector: 'app-decidir',
  standalone: true,
  imports: [
    ReferenciasMaterialModule
  ],
  templateUrl: './decidir.component.html',
  styleUrl: './decidir.component.css'
})
export class DecidirComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosDecision,
    public dialogRef: MatDialogRef<DecidirComponent>
  ) {

  }

  public cerrar() {
    this.dialogRef.close();
  }
}