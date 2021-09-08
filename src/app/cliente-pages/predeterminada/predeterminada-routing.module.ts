import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredeterminadaPage } from './predeterminada.page';

const routes: Routes = [
  {
    path: '',
    component: PredeterminadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredeterminadaPageRoutingModule {}
