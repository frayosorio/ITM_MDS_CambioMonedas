import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { MonedaService } from '../../../core/servicios/moneda.service';
import { Router } from '@angular/router';
import { Moneda } from '../../../shared/entidades/moneda';
import { MonedaEditarComponent } from '../moneda-editar/moneda-editar.component';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-moneda',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './moneda.component.html',
  styleUrl: './moneda.component.css'
})
export class MonedaComponent {

  public textoBusqueda: string = "";
  public monedas: Moneda[] = [];
  public columnas = [
    { name: 'Nombre', prop: 'nombre' },
    { name: 'Sigla', prop: 'sigla' },
    { name: 'Símbolo', prop: 'simbolo' },
    { name: 'Emisor', prop: 'emisor' },
  ];

  public monedaSeleccion: Moneda | undefined;
  public tipoSeleccion = SelectionType;
  public modoColumna = ColumnMode;
  public tema: String = "dark";

  constructor(public dialog: MatDialog,
    private monedaService: MonedaService,
    private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  public onActivate(event: any) {
    if (event.type == 'click') {
      this.monedaSeleccion = event.row;
    }
  }

  public listar() {
    this.monedaService.obtenerMonedas()
      .subscribe({
        next: data => {
          this.monedas = data;
        },
        error: error => {
          window.alert(error.message)
        }
      });
  }

  public buscar() {
    if (this.textoBusqueda.length == 0) {
      this.listar();
    }
    else {
      this.monedaService.buscar(0, this.textoBusqueda)
        .subscribe({
          next: data => {
            this.monedas = data;
          },
          error: error => {
            window.alert(error.message);
          }
        });
    }
  }

  public nuevo() {
    const dialogRef = this.dialog.open(MonedaEditarComponent, {
      width: '600px',
      height: '500px',
      data: {
        encabezado: "Agregando Moneda:",
        moneda: new Moneda(
          0, //Id
          "", //Nombre
          "", //CodigoAlfa2
          "", //CodigoAlfa3
          "", //Emisor
        ),
      }
    });

    dialogRef.afterClosed().subscribe({
      next: datos => {
        this.guardar(datos.moneda);
      },
      error: error => {
        window.alert(error.message)
      }
    });
  }

  private guardar(moneda: Moneda) {
    this.monedaService.actualizar(moneda)
      .subscribe({
        next: dataA => {
          if (dataA) {
            this.monedaService.obtenerMonedas()
              .subscribe({
                next: data => {
                  this.monedas = data;
                },
                error: error => {
                  window.alert(error.message)
                }
              });
            window.alert("Los datos de la Moneda fueron registrados");
          }
          else {
            window.alert("No se pudo actualizar la Moneda");
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            window.alert(`Error actualizando Moneda en el cliente [${err.message}]`);
          } else {
            window.alert(`Error actualizando Moneda en el servidor [${err.message}]`);
          }
        }
      });
  }

  public modificar() {
    if (this.monedaSeleccion != null && this.monedaSeleccion.id >= 0) {
      const dialogRef = this.dialog.open(MonedaEditarComponent, {
        width: '600px',
        height: '500px',
        data: {
          encabezado: `Editando datos de ${this.monedaSeleccion.nombre}`,
          moneda: this.monedaSeleccion,
        }
      });

      dialogRef.afterClosed().subscribe({
        next: datos => {
          this.guardar(datos.moneda);
        },
        error: error => {
          window.alert(error.message)
        }
      });
    }
  }

  public verificarEliminar() {
    if (this.monedaSeleccion != null && this.monedaSeleccion.id >= 0) {
      const dialogRef = this.dialog.open(DecidirComponent, {
        width: '400px',
        height: '200px',
        data: {
          titulo: `Eliminando registro de ${this.monedaSeleccion.nombre}`,
          mensaje: "Está seguro?",
          id: this.monedaSeleccion.id
        }
      });

      dialogRef.afterClosed().subscribe({
        next: datos => {
          this.eliminar(datos.id);
        },
        error: error => {
          window.alert(error.message)
        }
      });
    }
  }

  private eliminar(idMoneda: number) {
    this.monedaService.eliminar(idMoneda)
      .subscribe({
        next: (dataE) => {
          this.monedaService.obtenerMonedas()
            .subscribe({
              next: data => {
                this.monedas = data;
              },
              error: error => {
                window.alert(error.message)
              }
            });
          window.alert("El registro de la Moneda fue eliminado");
        },
        error: (error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            window.alert(`Error eliminando Moneda en el cliente [${error.message}]`);
          } else {
            window.alert(`Error eliminando Moneda en el servidor [${error.message}]`);
          }
        }
      });
  }



}
