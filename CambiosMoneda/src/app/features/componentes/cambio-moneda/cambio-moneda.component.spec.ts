import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioMonedaComponent } from './cambio-moneda.component';

describe('CambioMonedaComponent', () => {
  let component: CambioMonedaComponent;
  let fixture: ComponentFixture<CambioMonedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioMonedaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambioMonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
