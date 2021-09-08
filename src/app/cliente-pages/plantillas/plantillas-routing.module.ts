import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantillasPage } from './plantillas.page';

const routes: Routes = [
  {
    path: '',
    component: PlantillasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantillasPageRoutingModule {}
