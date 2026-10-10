import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Moneda } from '../../shared/entidades/moneda';
import { environment } from '../../../environments/environment';
import { MonedaService } from './moneda.service';
import { CambioMoneda } from '../../shared/entidades/cambiomoneda';

describe('MonedaService', () => {
  let service: MonedaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MonedaService]
    });

    service = TestBed.inject(MonedaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });

  it('debería obtener monedas', () => {
    service.obtenerMonedas().subscribe();
    const req = httpMock.expectOne(`${environment.urlBase}monedas/listar`);
    expect(req.request.method).toBe('GET');
  });

  it('debería buscar monedas con tipo y dato', () => {
    service.buscar(1, 'PESO').subscribe();
    const req = httpMock.expectOne(`${environment.urlBase}monedas/buscar/1/PESO`);
    expect(req.request.method).toBe('GET');
  });

  it('debería agregar moneda si id es 0', () => {
    const moneda: Moneda = { id: 0, nombre: 'Peso', sigla: 'COP', simbolo: '$' };
    service.actualizar(moneda).subscribe();
    const req = httpMock.expectOne(`${environment.urlBase}monedas/agregar`);
    expect(req.request.method).toBe('POST');
  });

  it('debería modificar moneda si id no es 0', () => {
    const moneda: Moneda = { id: 2, nombre: 'Dólar', sigla: 'USD', simbolo: '$' };
    service.actualizar(moneda).subscribe();
    const req = httpMock.expectOne(`${environment.urlBase}monedas/modificar`);
    expect(req.request.method).toBe('PUT');
  });

  it('debería eliminar una moneda', () => {
    service.eliminar(5).subscribe();
    const req = httpMock.expectOne(`${environment.urlBase}monedas/eliminar/5`);
    expect(req.request.method).toBe('DELETE');
  });

  it('debería obtener cambios de una moneda', () => {
    service.obtenerCambios(10).subscribe();
    const req = httpMock.expectOne(`${environment.urlBase}monedas/cambios/10`);
    expect(req.request.method).toBe('GET');
  });

  it('debería buscar cambio por fecha', () => {
    const fecha = new Date('2024-05-01');
    service.buscarCambio(2, fecha).subscribe();
    const req = httpMock.expectOne(`${environment.urlBase}monedas/cambios/buscar/2/${fecha}`);
    expect(req.request.method).toBe('GET');
  });

  it('debería agregar un cambio si idMoneda es 0', () => {
    const cambio: CambioMoneda = { idMoneda: 0, fecha: new Date(), valor: 123 } as any;
    service.actualizarCambio(cambio).subscribe();
    const req = httpMock.expectOne(`${environment.urlBase}monedas/cambios`);
    expect(req.request.method).toBe('POST');
  });

  it('debería modificar un cambio si idMoneda no es 0', () => {
    const cambio: CambioMoneda = { idMoneda: 2, fecha: new Date(), valor: 456 } as any;
    service.actualizarCambio(cambio).subscribe();
    const req = httpMock.expectOne(`${environment.urlBase}monedas/cambios`);
    expect(req.request.method).toBe('PUT');
  });

  it('debería eliminar un cambio por idMoneda y fecha', () => {
    const fecha = new Date('2024-05-01');
    service.eliminarCambio(3, fecha).subscribe();
    const req = httpMock.expectOne(`${environment.urlBase}monedas/cambios/3/${fecha}`);
    expect(req.request.method).toBe('DELETE');
  });
});
