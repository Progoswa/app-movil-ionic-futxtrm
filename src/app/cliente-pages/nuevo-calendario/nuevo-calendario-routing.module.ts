import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoCalendarioPage } from './nuevo-calendario.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoCalendarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoCalendarioPageRoutingModule {}
