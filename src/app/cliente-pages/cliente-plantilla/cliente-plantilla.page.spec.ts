import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientePlantillaPage } from './cliente-plantilla.page';

describe('ClientePlantillaPage', () => {
  let component: ClientePlantillaPage;
  let fixture: ComponentFixture<ClientePlantillaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientePlantillaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientePlantillaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
