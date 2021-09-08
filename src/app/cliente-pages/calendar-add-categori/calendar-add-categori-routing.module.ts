import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarAddCategoriPage } from './calendar-add-categori.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarAddCategoriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarAddCategoriPageRoutingModule {}
