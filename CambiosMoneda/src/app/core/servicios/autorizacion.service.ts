import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../../shared/entidades/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  private readonly TOKEN_KEY = 'token';

  /*
  private usuarioActualSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioActual$ = this.usuarioActualSubject.asObservable();

  constructor() {
    // Si usas localStorage/sessionStorage
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuarioActualSubject.next(JSON.parse(usuarioGuardado));
    }
  }

    get usuarioActual(): Usuario | null {
    return this.usuarioActualSubject.value;
  }

 */
  /*
  login(usuario: Usuario) {
    this.usuarioActualSubject.next(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }
    */

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioActual');
  }

  guardarToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  eliminarToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  estaAutenticado(): boolean {
    return this.obtenerToken() !== null;
  }
}
