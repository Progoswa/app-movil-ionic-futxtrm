import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalizadaPageRoutingModule } from './personalizada-routing.module';

import { PersonalizadaPage } from './personalizada.page';
import { VimeoMainPipe } from 'src/app/vimeo.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalizadaPageRoutingModule,
    VimeoMainPipe,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [PersonalizadaPage]
})
export class PersonalizadaPageModule {}
