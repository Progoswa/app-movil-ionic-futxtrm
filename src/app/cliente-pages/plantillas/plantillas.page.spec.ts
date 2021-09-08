import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlantillasPage } from './plantillas.page';

describe('PlantillasPage', () => {
  let component: PlantillasPage;
  let fixture: ComponentFixture<PlantillasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlantillasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
