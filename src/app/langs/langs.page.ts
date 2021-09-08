import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { InicioPage } from '../cliente-pages/inicio/inicio.page';

@Component({
  selector: 'app-langs',
  templateUrl: './langs.page.html',
  styleUrls: ['./langs.page.scss'],
})
export class LangsPage implements OnInit {

  constructor(
    private popover:PopoverController,
    private trasnlate:TranslateService
  ) {
    console.log(trasnlate);
    
   }

  ngOnInit() {
  }

  langs = []
  ionViewWillEnter(){
    this.langs = this.trasnlate.getLangs()
  }

  use(lang){
    localStorage.setItem('lang',lang)
    this.trasnlate.use(lang)
    this.popover.dismiss()

  }
  close(){
    this.popover.dismiss()
  }

}
