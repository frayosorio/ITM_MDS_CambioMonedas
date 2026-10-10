import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Pais } from '../../shared/entidades/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}paises/`;
  }

  public obtenerPaises(): Observable<Pais[]> {
    let urlT = `${this.url}listar`;
    return this.http.get<Pais[]>(urlT);
  }

  public buscar(tipo: number, dato: string): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.url}buscar/${tipo}/${dato}`);
  }

  public actualizar(pais: Pais): Observable<Pais> {
    let urlT = pais.id == 0 ? `${this.url}agregar` : `${this.url}modificar`;
    return pais.id == 0 ? this.http.post<Pais>(urlT, pais) : this.http.put<Pais>(urlT, pais);
  }

  public eliminar(idPais: number): Observable<any> {
    let urlT = `${this.url}eliminar/${idPais}`;
    return this.http.delete<any>(urlT);
  }
}
