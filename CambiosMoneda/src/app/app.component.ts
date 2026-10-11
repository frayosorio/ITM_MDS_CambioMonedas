import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {AutorizacionService} from "./core/servicios/autorizacion.service";
import {UsuarioService} from "./core/servicios/usuario.service";
import {Usuario} from "./shared/entidades/Usuario";
import {LoginComponent} from "./features/componentes/login/login.component";
import {ReferenciasMaterialModule} from "./shared/modulos/referencias-material.module";
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReferenciasMaterialModule,
    RouterLink,
    NgFor,
    NgIf
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CambioMoneda';

  public usuarioActual: Usuario | null = null;

  public opciones=[
    { titulo: 'Monedas', url: 'monedas', icono: 'assets/iconos/Monedas.png' },
    { titulo: 'Paises', url: 'paises', icono: 'assets/iconos/Paises.png' },
    { titulo: 'Cambios', url: 'cambios', icono: 'assets/iconos/Cambios.png' },
  ];

  constructor(private dialogServicio: MatDialog,
              private autorizacionServicio: AutorizacionService,
              private usuarioServicio: UsuarioService,
              private router: Router
  ) {
  }

  abrirLogin(): void {
    const dialogRef = this.dialogServicio.open(LoginComponent, {
      width: '400px',
      height: '300px',
      data: { usuario: "", clave: "" }
    });

    dialogRef.afterClosed().subscribe(response => {
        this.usuarioServicio.iniciarSesion(response.usuario, response.clave).subscribe(
          {
            next: response => {
              this.usuarioActual = response.usuario;
              localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
              this.autorizacionServicio.guardarToken(response.token);
            },
            error: error => {
              window.alert(error.message);
            }
          }
        );
      }
    );
  }

  cerrarSesion() {
    this.usuarioActual = null;
    this.autorizacionServicio.cerrarSesion();
    this.router.navigate(['/inicio']);
  }
}
