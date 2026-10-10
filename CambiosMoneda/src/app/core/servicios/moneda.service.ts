import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Moneda } from '../../shared/entidades/moneda';
import { CambioMoneda } from '../../shared/entidades/cambiomoneda';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}monedas`;
  }

  public obtenerMonedas(): Observable<Moneda[]> {
    let urlT = `${this.url}`;
    return this.http.get<Moneda[]>(urlT);
  }

  public buscar(tipo: number, dato: string): Observable<Moneda[]> {
    return this.http.get<Moneda[]>(`${this.url}/buscar/${tipo}/${dato}`);
  }

  public actualizar(moneda: Moneda): Observable<Moneda> {
    let urlT = moneda.id == 0 ? `${this.url}` : `${this.url}`;
    return moneda.id == 0 ? this.http.post<Moneda>(urlT, moneda) : this.http.put<Moneda>(urlT, moneda);
  }

  public eliminar(idMoneda: number): Observable<any> {
    let urlT = `${this.url}/${idMoneda}`;
    return this.http.delete<any>(urlT);
  }

  /********** CAMBIOS **********/
  public obtenerCambios(idMoneda: number): Observable<CambioMoneda[]> {
    let urlT = `${this.url}cambios/${idMoneda}`;
    return this.http.get<CambioMoneda[]>(urlT);
  }

  public buscarCambio(idMoneda: number, fecha: Date): Observable<CambioMoneda[]> {
    return this.http.get<CambioMoneda[]>(`${this.url}cambios/buscar/${idMoneda}/${fecha}`);
  }

  public actualizarCambio(cambio: CambioMoneda): Observable<Moneda> {
    let urlT = `${this.url}cambios`;
    return cambio.idMoneda == 0 ? this.http.post<Moneda>(urlT, cambio) : this.http.put<Moneda>(urlT, cambio);
  }

  public eliminarCambio(idMoneda: number, fecha: Date): Observable<any> {
    let urlT = `${this.url}cambios/${idMoneda}/${fecha}`;
    return this.http.delete<any>(urlT);
  }

}
