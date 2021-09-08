import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePlantillaPage } from './cliente-plantilla.page';

const routes: Routes = [
  {
    path: '',
    component: ClientePlantillaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePlantillaPageRoutingModule {}
