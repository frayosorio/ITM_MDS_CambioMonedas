import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaisComponent } from './pais.component';
import { Observable, of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { PaisService } from '../../../core/servicios/pais.service';
import { MonedaService } from '../../../core/servicios/moneda.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('PaisComponent', () => {
  let component: PaisComponent;
  let fixture: ComponentFixture<PaisComponent>;
  let mockPaisService: any;
  let mockMonedaService: any;

  const mockPaises = [
    { id: 1, nombre: 'Colombia', codigoAlfa2: 'CO', codigoAlfa3: 'COL', idMoneda: 1 },
    { id: 2, nombre: 'Estados Unidos', codigoAlfa2: 'US', codigoAlfa3: 'USA', idMoneda: 2 },
    { id: 3, nombre: 'México', codigoAlfa2: 'MX', codigoAlfa3: 'MXN', idMoneda: 3 },
  ];
  const mockMonedas = [
    { id: 1, nombre: 'Peso', sigla: 'COP', simbolo: '$', emisor: 'El Banco de la República' },
    { id: 2, nombre: 'Dólar', sigla: 'USD', simbolo: '$', emisor: 'Reserva Federal' },
    { id: 3, nombre: 'Peso', sigla: 'MXN', simbolo: '$', emisor: 'Banco de México' },
  ];

  beforeEach(async () => {
    mockPaisService = jasmine.createSpyObj('PaisService', ['obtenerPaises', 'buscar']);
    mockMonedaService = jasmine.createSpyObj('MonedaService', ['obtenerMonedas']);

    await TestBed.configureTestingModule({
      imports: [PaisComponent, MatDialogModule, BrowserAnimationsModule],
      providers: [
        { provide: PaisService, useValue: mockPaisService },
        { provide: MonedaService, useValue: mockMonedaService },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaisComponent);
    component = fixture.componentInstance;

    // Configurar el mock de obtenerPaises para devolver un Observable con mockPaises
    mockPaisService.obtenerPaises.and.returnValue(of(mockPaises));
    mockMonedaService.obtenerMonedas.and.returnValue(of(mockMonedas));

    fixture.detectChanges();
  });


  it('debería listar los países al inicializar', () => {
    // Llamar a ngOnInit (que a su vez llama a listar())
    component.ngOnInit();

    // Asegurarse de que los países se listan correctamente
    expect(component.paises).toEqual(mockPaises);
    // Verificar que se haya llamado al método obtenerPaises
    expect(mockPaisService.obtenerPaises).toHaveBeenCalled();
  });

  it('debería listar las monedas al inicializar', () => {
    // Llamar a ngOnInit (que a su vez llama a listar())
    component.ngOnInit();

    // Asegurarse de que las monedas se listan correctamente
    expect(component.monedas).toEqual(mockMonedas);
    // Verificar que se haya llamado al método obtenerMonedas
    expect(mockMonedaService.obtenerMonedas).toHaveBeenCalled();
  });

    it('debería buscar países por texto de búsqueda', () => {
  
    const mockPaisesEncontrados = [
      { id: 3, nombre: 'México', codigoAlfa2: 'MX', codigoAlfa3: 'MXN', idMoneda: 3 },
    ];
    component.textoBusqueda = 'México';
    mockPaisService.buscar.and.returnValue(of(mockPaisesEncontrados));

    component.buscar();

    expect(component.paises).toEqual(mockPaisesEncontrados);
    expect(mockPaisService.buscar).toHaveBeenCalledWith(0, 'México');
  });

  it('debería listar las monedas', () => {

    component.listarMonedas();

    expect(component.monedas).toEqual(mockMonedas.sort((a, b) => a.nombre.localeCompare(b.nombre)));
    expect(mockMonedaService.obtenerMonedas).toHaveBeenCalled();
  });

});
