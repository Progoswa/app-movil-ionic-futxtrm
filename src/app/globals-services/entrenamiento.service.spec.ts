/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EntrenamientoService } from './entrenamiento.service';

describe('Service: Entrenamiento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntrenamientoService]
    });
  });

  it('should ...', inject([EntrenamientoService], (service: EntrenamientoService) => {
    expect(service).toBeTruthy();
  }));
});
