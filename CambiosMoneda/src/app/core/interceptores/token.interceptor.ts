import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AutorizacionService } from "../servicios/autorizacion.service";
import {RUTA_DEFAULT} from "../../app.routes";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private autorizacionServicio: AutorizacionService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.autorizacionServicio.obtenerToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirige al login si el token no es válido o expiró
          this.autorizacionServicio.cerrarSesion(); // por ejemplo, elimina el token
          this.router.navigate([RUTA_DEFAULT]);
        }
        return throwError(() => error);
      })
    );
  }
}
