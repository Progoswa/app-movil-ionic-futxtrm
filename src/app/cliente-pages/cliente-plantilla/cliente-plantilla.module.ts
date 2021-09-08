import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientePlantillaPageRoutingModule } from './cliente-plantilla-routing.module';

import { ClientePlantillaPage } from './cliente-plantilla.page';
import { VimeoMainPipe } from 'src/app/vimeo.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientePlantillaPageRoutingModule,
    VimeoMainPipe,
    TranslateModule
  ],
  declarations: [ClientePlantillaPage]
})
export class ClientePlantillaPageModule {}
