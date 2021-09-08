import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { VimeoPipe } from './vimeo.pipe';
import { EjercicioPipe } from './ejercicio.pipe';



@NgModule({
  declarations:[VimeoPipe,EjercicioPipe], // <---
  imports:[CommonModule],
  exports:[VimeoPipe,EjercicioPipe] // <---
})

export class VimeoMainPipe{}