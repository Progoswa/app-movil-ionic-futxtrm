import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PredeterminadaPageRoutingModule } from './predeterminada-routing.module';

import { PredeterminadaPage } from './predeterminada.page';
import { VimeoMainPipe } from 'src/app/vimeo.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PredeterminadaPageRoutingModule,
    VimeoMainPipe,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [PredeterminadaPage]
})
export class PredeterminadaPageModule {}
