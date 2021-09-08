import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalizadaPage } from './personalizada.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalizadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalizadaPageRoutingModule {}
