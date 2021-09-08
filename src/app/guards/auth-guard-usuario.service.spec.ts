/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardUsuarioService } from './auth-guard-usuario.service';

describe('Service: AuthGuardUsuario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardUsuarioService]
    });
  });

  it('should ...', inject([AuthGuardUsuarioService], (service: AuthGuardUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
