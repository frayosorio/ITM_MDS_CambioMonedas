import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioMonedaEditarComponent } from './cambio-moneda-editar.component';

describe('CambioMonedaEditarComponent', () => {
  let component: CambioMonedaEditarComponent;
  let fixture: ComponentFixture<CambioMonedaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioMonedaEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambioMonedaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
