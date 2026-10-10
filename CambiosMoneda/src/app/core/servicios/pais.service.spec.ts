import { TestBed } from '@angular/core/testing';

import { PaisService } from './pais.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Pais } from '../../shared/entidades/pais';
import { environment } from '../../../environments/environment';


describe('PaisService', () => {
  let service: PaisService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaisService],
    });
    service = TestBed.inject(PaisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería retornar una lista de países', () => {
    const mockPaises: Pais[] = [
      { id: 1, nombre: 'Colombia', codigoAlfa2: 'CO', codigoAlfa3: 'COL', idMoneda: 1 },
      { id: 2, nombre: 'México', codigoAlfa2: 'MX', codigoAlfa3: 'MEX', idMoneda: 2 },
    ];

    service.obtenerPaises().subscribe(paises => {
      expect(paises.length).toBe(2);
      expect(paises).toEqual(mockPaises);
    });

    const req = httpMock.expectOne(`${environment.urlBase}paises/listar`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPaises);
  });

  it('debería buscar un país por tipo y dato', () => {
    const mockPaises: Pais[] = [
      { id: 1, nombre: 'Colombia', codigoAlfa2: 'CO', codigoAlfa3: 'COL', idMoneda: 1 },
    ];
    const tipo = 0;
    const dato = 'Colombia';

    service.buscar(tipo, dato).subscribe(paises => {
      expect(paises.length).toBe(1);
      expect(paises[0].nombre).toBe('Colombia');
    });

    const req = httpMock.expectOne(`${environment.urlBase}paises/buscar/${tipo}/${dato}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPaises);
  });

  it('debería eliminar un país por ID', () => {
    const idPais = 1;

    service.eliminar(idPais).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.urlBase}paises/eliminar/${idPais}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });


});
