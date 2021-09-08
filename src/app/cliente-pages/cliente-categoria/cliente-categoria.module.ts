import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteCategoriaPageRoutingModule } from './cliente-categoria-routing.module';

import { ClienteCategoriaPage } from './cliente-categoria.page';
import { VimeoMainPipe } from 'src/app/vimeo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteCategoriaPageRoutingModule,
    VimeoMainPipe
  ],
  declarations: [ClienteCategoriaPage]
})
export class ClienteCategoriaPageModule {}
