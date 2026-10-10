import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CambioMoneda } from '../../../shared/entidades/cambiomoneda';
import { Moneda } from '../../../shared/entidades/moneda';
import { MatDialog } from '@angular/material/dialog';
import { MonedaService } from '../../../core/servicios/moneda.service';
import { Router } from '@angular/router';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';
import { CambioMonedaEditarComponent } from '../cambio-moneda-editar/cambio-moneda-editar.component';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-cambio-moneda',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    HttpClientModule,
    FormsModule,
    NgFor,
    CommonModule
  ],
  templateUrl: './cambio-moneda.component.html',
  styleUrl: './cambio-moneda.component.css'
})
export class CambioMonedaComponent {

  public fechaBusqueda: Date = new Date();
  public cambios: CambioMoneda[] = [];
  public monedas: Moneda[] = [];
  public columnas = [
    { name: 'Fecha', prop: 'fecha' },
    { name: 'Cambio', prop: 'cambio' },
    { name: 'Moneda', prop: 'moneda.nombre' },
  ];

  public cambioSeleccion: CambioMoneda | undefined;
  public idMonedaSeleccion: number = 0;
  public tipoSeleccion = SelectionType;
  public modoColumna = ColumnMode;
  public tema: String = "dark";

  constructor(public dialog: MatDialog,
    private monedaService: MonedaService,
    private router: Router) { }

  ngOnInit(): void {
    this.listarMonedas();
  }

  public onActivate(event: any) {
    if (event.type == 'click') {
      this.cambioSeleccion = event.row;
    }
  }

  public listar() {
    this.monedaService.obtenerCambios(this.idMonedaSeleccion)
      .subscribe({
        next: data => {
          this.cambios = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        },
        error: error => {
          window.alert(error.message)
        }
      });
  }

  public listarMonedas() {
    this.monedaService.obtenerMonedas().subscribe(
      {
        next: data => {
          this.monedas = data.sort((a, b) => a.nombre.localeCompare(b.nombre));;
        },
        error: error => {
          window.alert(error.message);
        }
      }
    );
  }

  public buscar() {
    if (!this.fechaBusqueda) {
      this.listar();
    }
    else {
      this.monedaService.buscarCambio(this.idMonedaSeleccion, this.fechaBusqueda)
        .subscribe({
          next: data => {
            this.cambios = data;
          },
          error: error => {
            window.alert(error.message);
          }
        });
    }
  }

  public nuevo() {
    const dialogRef = this.dialog.open(CambioMonedaEditarComponent, {
      width: '600px',
      height: '500px',
      data: {
        encabezado: "Agregando CambioMoneda:",
        cambio: new CambioMoneda(
          this.idMonedaSeleccion, //IdMoneda
          null, //Moneda
          new Date(), //CodigoAlfa2
          0, //Valor
        ),
        monedas: this.monedas,
      }
    });

    dialogRef.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.guardar(datos.pais);
        }
      },
      error: error => {
        window.alert(error.message)
      }
    });
  }

  private guardar(cambio: CambioMoneda) {
    this.monedaService.actualizarCambio(cambio)
      .subscribe({
        next: dataA => {
          if (dataA) {
            this.monedaService.buscarCambio(this.idMonedaSeleccion, cambio.fecha)
              .subscribe({
                next: data => {
                  this.cambios = data;
                },
                error: error => {
                  window.alert(error.message)
                }
              });
            window.alert("Los datos del País fueron registrados");
          }
          else {
            window.alert("No se pudo actualizar la CambioMoneda");
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            window.alert(`Error actualizando CambioMoneda en el cliente [${err.message}]`);
          } else {
            window.alert(`Error actualizando CambioMoneda en el servidor [${err.message}]`);
          }
        }
      });
  }

  public modificar() {
    if (this.cambioSeleccion != null) {
      const dialogRef = this.dialog.open(CambioMonedaEditarComponent, {
        width: '600px',
        height: '500px',
        data: {
          encabezado: `Editando datos de ${this.cambioSeleccion.moneda!.nombre} fecha ${this.cambioSeleccion.fecha}`,
          cambio: this.cambioSeleccion,
          monedas: this.monedas,
        }
      });

      dialogRef.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.guardar(datos.pais);
          }
        },
        error: error => {
          window.alert(error.message)
        }
      });
    }
  }

  public verificarEliminar() {
    if (this.cambioSeleccion != null) {
      const dialogRef = this.dialog.open(DecidirComponent, {
        width: '400px',
        height: '200px',
        data: {
          titulo: `Eliminando registro de ${this.cambioSeleccion.moneda!.nombre} fecha ${this.cambioSeleccion.fecha}`,
          mensaje: "Está seguro?",
          id: this.cambioSeleccion.idMoneda
        }
      });

      dialogRef.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.eliminar(this.idMonedaSeleccion, datos.fecha);
          }
        },
        error: error => {
          window.alert(error.message)
        }
      });
    }
  }

  private eliminar(idMoneda: number, fecha: Date) {
    this.monedaService.eliminarCambio(idMoneda, fecha)
      .subscribe({
        next: (dataE) => {
          this.monedaService.obtenerCambios(idMoneda)
            .subscribe({
              next: data => {
                this.cambios = data;
              },
              error: error => {
                window.alert(error.message)
              }
            });
          window.alert("El registro del Cambio de Moneda fue eliminado");
        },
        error: (error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            window.alert(`Error eliminando Cambio de Moneda en el cliente [${error.message}]`);
          } else {
            window.alert(`Error eliminando Cambio de Moneda en el servidor [${error.message}]`);
          }
        }
      });
  }


}
