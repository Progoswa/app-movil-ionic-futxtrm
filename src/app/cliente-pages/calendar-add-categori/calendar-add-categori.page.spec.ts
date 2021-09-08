import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalendarAddCategoriPage } from './calendar-add-categori.page';

describe('CalendarAddCategoriPage', () => {
  let component: CalendarAddCategoriPage;
  let fixture: ComponentFixture<CalendarAddCategoriPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarAddCategoriPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarAddCategoriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
