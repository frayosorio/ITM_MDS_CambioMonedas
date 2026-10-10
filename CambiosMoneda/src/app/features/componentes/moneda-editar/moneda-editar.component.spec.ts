import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonedaEditarComponent } from './moneda-editar.component';

describe('MonedaEditarComponent', () => {
  let component: MonedaEditarComponent;
  let fixture: ComponentFixture<MonedaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonedaEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonedaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
