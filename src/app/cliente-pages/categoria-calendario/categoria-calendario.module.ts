import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaCalendarioPageRoutingModule } from './categoria-calendario-routing.module';

import { CategoriaCalendarioPage } from './categoria-calendario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaCalendarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CategoriaCalendarioPage]
})
export class CategoriaCalendarioPageModule {}
