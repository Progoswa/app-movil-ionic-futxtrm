import { Component, OnInit } from '@angular/core';
import { PlantillaService } from 'src/app/globals-services/plantilla.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Button } from 'protractor';
import { CalendarioService } from 'src/app/globals-services/calendario.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.page.html',
  styleUrls: ['./plantillas.page.scss'],
})
export class PlantillasPage implements OnInit {
  plantillas: any = [];

  constructor(
    private plantillaService:PlantillaService,
    private router:Router,
    private alertController:AlertController,
    private calendarioSerivce:CalendarioService,
    private translate:TranslateService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    
    this.misPlantillas()
  }

  misPlantillas() {
    this.plantillas = []
    this.calendarioSerivce.getMyCalendarios(localStorage.getItem('id')).subscribe((resp:any)=>{
      if(resp.ok){
        resp.calendarios.forEach((calendario) => {
          if(calendario.plantilla != null){
            this.plantillas.push(calendario.plantilla)
          }
        });
      }
      
    })
  
  }

  getTotalTime(plantilla){
    // let cantidad = 0
    let minutos = 0
    plantilla.plantilla.forEach((objeto) => {
      // cantidad += objeto.cantidad
      minutos += objeto.minutos * objeto.cantidad
    });
    return minutos
    
  }

  verPlantilla(id){
    console.log(id);
    
    this.router.navigate(['/cliente/plantilla'],{queryParams:{id}})
    
  }


 


  async borrar(id){

    let alert = await this.alertController.create({
      cssClass:'alertblack',
      header:this.translate.instant('user.templates.delete.title'),
      message:this.translate.instant('user.templates.delete.subtitle'),
      buttons:[
        {
          text:this.translate.instant('cancel'),
          cssClass:'button-alert-cancel'
        },
        {
          text:this.translate.instant('delete'),
          cssClass:'button-alert',
          handler:()=>{

            this.plantillaService.deletePlantilla(id).subscribe(async (resp:any)=>{
              if(resp.ok){
                this.misPlantillas()
                let borrado = await this.alertController.create({
                  cssClass:'alertblack',
                  header:this.translate.instant('user.templates.delete.success.title'),
                  message:this.translate.instant('user.templates.delete.success.subtitle'),
                  buttons:[{text:this.translate.instant('accept'),cssClass:'button-alert'}]
                })
                borrado.present()
              }
            })
          }
        }
      ]
    })
 
    alert.present()
     
  }
}
