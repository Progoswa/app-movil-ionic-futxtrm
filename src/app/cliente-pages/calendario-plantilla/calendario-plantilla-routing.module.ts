import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarioPlantillaPage } from './calendario-plantilla.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarioPlantillaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioPlantillaPageRoutingModule {}
