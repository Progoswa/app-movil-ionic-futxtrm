import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElegirPage } from './elegir.page';

describe('ElegirPage', () => {
  let component: ElegirPage;
  let fixture: ComponentFixture<ElegirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElegirPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElegirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
