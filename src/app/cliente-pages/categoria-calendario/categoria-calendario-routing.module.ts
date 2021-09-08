import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaCalendarioPage } from './categoria-calendario.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaCalendarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaCalendarioPageRoutingModule {}
