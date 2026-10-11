import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../shared/entidades/Usuario';
import {environment} from "../../../environments/environment";
import {UsuarioLoginDto} from "../../shared/dtos/usuario-login.dto";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}usuarios`;
  }

  public iniciarSesion(usuario: string, password: string): Observable<UsuarioLoginDto> {
    return this.http.get<UsuarioLoginDto>(`${this.url}/login/${usuario}/${password}`);
  }

  public listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}`);
  }

  public buscar(dato: String): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/buscar/${dato}`);
  }

  public agregar(ciudad: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}`, ciudad);
  }

  public modificar(ciudad: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}`, ciudad);
  }

  public eliminar(idUsuario: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${idUsuario}`);
  }

}
