import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioPlantillaPageRoutingModule } from './calendario-plantilla-routing.module';

import { CalendarioPlantillaPage } from './calendario-plantilla.page';
import { VimeoMainPipe } from 'src/app/vimeo.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPlantillaPageRoutingModule,
    VimeoMainPipe,
    TranslateModule
  ],
  declarations: [CalendarioPlantillaPage]
})
export class CalendarioPlantillaPageModule {}
