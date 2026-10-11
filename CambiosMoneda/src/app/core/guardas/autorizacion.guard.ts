import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {RUTA_DEFAULT} from "../../app.routes";

@Injectable({
  providedIn: 'root'
})
export class AutorizacionGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token && !this.tokenExpirado(token)) {
      return true;
    } else {
      this.router.navigate([RUTA_DEFAULT]); // ruta al login
      return false;
    }
  }

  private tokenExpirado(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (e) {
      return true; // si hay error, consideramos el token inválido
    }
  }
}
