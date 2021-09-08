import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlantillasPageRoutingModule } from './plantillas-routing.module';

import { PlantillasPage } from './plantillas.page';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlantillasPageRoutingModule,
    TranslateModule
  ],
  declarations: [PlantillasPage]
})
export class PlantillasPageModule {}
