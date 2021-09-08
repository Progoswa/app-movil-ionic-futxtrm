import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PredeterminadaPage } from './predeterminada.page';

describe('PredeterminadaPage', () => {
  let component: PredeterminadaPage;
  let fixture: ComponentFixture<PredeterminadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredeterminadaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PredeterminadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
