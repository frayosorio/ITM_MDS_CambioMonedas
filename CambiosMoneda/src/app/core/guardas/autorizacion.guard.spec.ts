import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autorizacionGuard } from './autorizacion.guard';

describe('autorizacionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autorizacionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
