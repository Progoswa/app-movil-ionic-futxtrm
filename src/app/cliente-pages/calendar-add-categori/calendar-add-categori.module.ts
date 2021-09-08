import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarAddCategoriPageRoutingModule } from './calendar-add-categori-routing.module';

import { CalendarAddCategoriPage } from './calendar-add-categori.page';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, CalendarAddCategoriPageRoutingModule],
	declarations: [CalendarAddCategoriPage],
})
export class CalendarAddCategoriPageModule {}
