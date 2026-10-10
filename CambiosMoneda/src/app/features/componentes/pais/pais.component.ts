import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Pais } from '../../../shared/entidades/pais';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaisService } from '../../../core/servicios/pais.service';
import { PaisEditarComponent } from '../pais-editar/pais-editar.component';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';
import { Moneda } from '../../../shared/entidades/moneda';
import { MonedaService } from '../../../core/servicios/moneda.service';

@Component({
  selector: 'app-pais',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './pais.component.html',
  styleUrl: './pais.component.css'
})
export class PaisComponent {

  public textoBusqueda: string = "";
  public paises: Pais[] = [];
  public monedas: Moneda[] = [];
  public columnas = [
    { name: 'Nombre', prop: 'nombre' },
    { name: 'Código Alfa 2', prop: 'codigoAlfa2' },
    { name: 'Código Alfa 3', prop: 'codigoAlfa3' },
    { name: 'Moneda', prop: 'moneda.nombre' },
  ];

  public paisSeleccion: Pais | undefined;
  public tipoSeleccion = SelectionType;
  public modoColumna = ColumnMode;
  public tema: String = "dark";

  constructor(public dialog: MatDialog,
    private paisService: PaisService,
    private monedaService: MonedaService,
    private router: Router) { }

  ngOnInit(): void {
    this.listar();
    this.listarMonedas();
  }

  public onActivate(event: any) {
    if (event.type == 'click') {
      this.paisSeleccion = event.row;
    }
  }

  public listar() {
    this.paisService.obtenerPaises()
      .subscribe({
        next: data => {
          this.paises = data;
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
    if (this.textoBusqueda.length == 0) {
      this.listar();
    }
    else {
      this.paisService.buscar(0, this.textoBusqueda)
        .subscribe({
          next: data => {
            this.paises = data;
          },
          error: error => {
            window.alert(error.message);
          }
        });
    }
  }

  public nuevo() {
    const dialogRef = this.dialog.open(PaisEditarComponent, {
      width: '600px',
      height: '500px',
      data: {
        encabezado: "Agregando Pais:",
        pais: new Pais(
          0, //Id
          "", //Nombre
          "", //CodigoAlfa2
          "", //CodigoAlfa2
          0, //IdMoneda
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

  private guardar(pais: Pais) {
    this.paisService.actualizar(pais)
      .subscribe({
        next: dataA => {
          if (dataA) {
            this.paisService.buscar(0, pais.nombre)
              .subscribe({
                next: data => {
                  this.paises = data;
                },
                error: error => {
                  window.alert(error.message)
                }
              });
            window.alert("Los datos del País fueron registrados");
          }
          else {
            window.alert("No se pudo actualizar la Pais");
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            window.alert(`Error actualizando Pais en el cliente [${err.message}]`);
          } else {
            window.alert(`Error actualizando Pais en el servidor [${err.message}]`);
          }
        }
      });
  }

  public modificar() {
    if (this.paisSeleccion != null && this.paisSeleccion.id >= 0) {
      const dialogRef = this.dialog.open(PaisEditarComponent, {
        width: '600px',
        height: '500px',
        data: {
          encabezado: `Editando datos de ${this.paisSeleccion.nombre}`,
          pais: this.paisSeleccion,
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
    if (this.paisSeleccion != null && this.paisSeleccion.id >= 0) {
      const dialogRef = this.dialog.open(DecidirComponent, {
        width: '400px',
        height: '200px',
        data: {
          titulo: `Eliminando registro de ${this.paisSeleccion.nombre}`,
          mensaje: "Está seguro?",
          id: this.paisSeleccion.id
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

  private eliminar(idPais: number) {
    this.paisService.eliminar(idPais)
      .subscribe({
        next: (dataE) => {
          this.paisService.obtenerPaises()
            .subscribe({
              next: data => {
                this.paises = data;
              },
              error: error => {
                window.alert(error.message)
              }
            });
          window.alert("El registro del País fue eliminado");
        },
        error: (error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            window.alert(`Error eliminando Pais en el cliente [${error.message}]`);
          } else {
            window.alert(`Error eliminando Pais en el servidor [${error.message}]`);
          }
        }
      });
  }


}
