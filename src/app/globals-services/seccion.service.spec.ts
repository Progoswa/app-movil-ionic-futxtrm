/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeccionService } from './seccion.service';

describe('Service: Seccion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeccionService]
    });
  });

  it('should ...', inject([SeccionService], (service: SeccionService) => {
    expect(service).toBeTruthy();
  }));
});
