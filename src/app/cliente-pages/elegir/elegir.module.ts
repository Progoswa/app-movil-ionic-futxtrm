import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElegirPageRoutingModule } from './elegir-routing.module';

import { ElegirPage } from './elegir.page';
import { VimeoMainPipe } from 'src/app/vimeo.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElegirPageRoutingModule,
    VimeoMainPipe,
    TranslateModule
  ],
  declarations: [ElegirPage]
})
export class ElegirPageModule {}
