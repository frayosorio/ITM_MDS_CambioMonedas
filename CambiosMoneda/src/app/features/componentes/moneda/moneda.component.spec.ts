import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonedaComponent } from './moneda.component';
import { of, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MonedaService } from '../../../core/servicios/moneda.service';
import { Moneda } from '../../../shared/entidades/moneda';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaisEditarComponent } from '../pais-editar/pais-editar.component';


describe('MonedaComponent', () => {
  let component: MonedaComponent;
  let fixture: ComponentFixture<MonedaComponent>;
  let monedaServiceSpy: jasmine.SpyObj<MonedaService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const monedaServiceMock = jasmine.createSpyObj('MonedaService', ['obtenerMonedas', 'buscar', 'actualizar', 'eliminar']);
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [MonedaComponent, BrowserAnimationsModule],  // Asegúrate de importar BrowserAnimationsModule
      providers: [
        { provide: MonedaService, useValue: monedaServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: Router, useValue: routerMock },
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MonedaComponent);
    component = fixture.componentInstance;
    monedaServiceSpy = TestBed.inject(MonedaService) as jasmine.SpyObj<MonedaService>;
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar listar en ngOnInit', () => {
    const spy = spyOn(component, 'listar');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('listar debería cargar monedas desde el servicio', () => {
    const mockMonedas = [{ id: 1, nombre: 'Euro' }] as Moneda[];
    monedaServiceSpy.obtenerMonedas.and.returnValue(of(mockMonedas));

    component.listar();

    expect(monedaServiceSpy.obtenerMonedas).toHaveBeenCalled();
    expect(component.monedas).toEqual(mockMonedas);
  });

  it('buscar sin texto debería llamar listar', () => {
    const spy = spyOn(component, 'listar');
    component.textoBusqueda = '';
    component.buscar();
    expect(spy).toHaveBeenCalled();
  });

  it('buscar con texto debería llamar monedaService.buscar', () => {
    const resultado = [{ id: 2, nombre: 'Dólar' }] as Moneda[];
    component.textoBusqueda = 'dólar';
    monedaServiceSpy.buscar.and.returnValue(of(resultado));

    component.buscar();

    expect(monedaServiceSpy.buscar).toHaveBeenCalledWith(0, 'dólar');
    expect(component.monedas).toEqual(resultado);
  });

  it('onActivate debería asignar monedaSeleccion si es click', () => {
    const mockMoneda = { id: 3, nombre: 'Peso' } as Moneda;
    component.onActivate({ type: 'click', row: mockMoneda });
    expect(component.monedaSeleccion).toEqual(mockMoneda);
  });

  it('listar debería manejar error con alert', () => {
    spyOn(window, 'alert');
    monedaServiceSpy.obtenerMonedas.and.returnValue(throwError(() => new Error('Fallo en la carga')));

    component.listar();

    expect(window.alert).toHaveBeenCalledWith('Fallo en la carga');
  });

  it('buscar debería manejar error con alert', () => {
    spyOn(window, 'alert');
    component.textoBusqueda = 'yen';
    monedaServiceSpy.buscar.and.returnValue(throwError(() => new Error('Fallo búsqueda')));

    component.buscar();

    expect(window.alert).toHaveBeenCalledWith('Fallo búsqueda');
  });
});
