import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteCategoriaPage } from './cliente-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteCategoriaPageRoutingModule {}
