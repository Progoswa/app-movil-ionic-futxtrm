/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlantillaService } from './plantilla.service';

describe('Service: Plantilla', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlantillaService]
    });
  });

  it('should ...', inject([PlantillaService], (service: PlantillaService) => {
    expect(service).toBeTruthy();
  }));
});
