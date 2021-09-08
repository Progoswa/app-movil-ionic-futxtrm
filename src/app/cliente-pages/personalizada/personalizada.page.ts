import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/globals-services/categoria.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarioService } from 'src/app/globals-services/calendario.service';
import * as moment from 'moment'
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-personalizada',
  templateUrl: './personalizada.page.html',
  styleUrls: ['./personalizada.page.scss'],
})
export class PersonalizadaPage implements OnInit {
  data: any;

  
  constructor(
 
    private categoriaService:CategoriaService,
    private fb:FormBuilder,
    private alertController:AlertController,
    private calendarioService:CalendarioService,
    private translate:TranslateService,
    private router:Router

  ) {

    
    this.data = router.getCurrentNavigation().extras.state.categoria
   }

  ngOnInit() {
    console.log(this.data);
    this.fechaDia(this.data.dias)
  }

  horarioForm = this.fb.group({
    min:['',[Validators.required]],
    max:['',[Validators.required]]
  })

  week = moment().startOf('week')
  tipos = [1,2,3,4,5]
  turno = ''

  dia = [
    {
      fecha:'',
      tipo:0
    }
  ]

  aceptar(){
    this.horarioForm.value.min = moment(this.horarioForm.value.min ).format('HH:mm')
    let calendario = {
      dias:this.dia,
      categoria:this.data._id,
      usuario:localStorage.getItem('id'),
      horario:this.horarioForm.value
    }

    this.calendarioService.predeterminada(calendario).subscribe(async (resp:any)=>{
     if(resp.ok){
      this.router.navigate(["/calendario-plantilla"],{state:{plantillas:resp.plantillas},preserveFragment:false,replaceUrl:true})
      
     }else{
       if(resp.err.code == 100){
  
        let alert = await this.alertController.create({
          cssClass:'alertblack',
          header:this.translate.instant('user.home.choose.personalized.limit.title'),
          message:this.translate.instant('user.home.choose.personalized.limit.subtitle'),
          buttons:[{text:'Okey',cssClass:'button-alert'}]
        }) 
    
        alert.present()
       }else{
        let alert = await this.alertController.create({
          cssClass:'alertblack',
          header:this.translate.instant('user.home.choose.personalized.error.title'),
          message:this.translate.instant('user.home.choose.personalized.error.subtitle'),
          buttons:[{text:'Okey',cssClass:'button-alert'}]
        }) 
    
        alert.present()
       }
      
      
     }
  
    })
    
   
    
  }



  cancelar(): void {
    this.router.navigate(["/c/inicio"],{preserveFragment:false,replaceUrl:true})
  }


  fechaDia(dias:any[]){
 this.data.dias = dias.map((dia)=>{
  dia.fecha = moment(this.week).add(dia.dia,'days')

 
  if(dia.fecha < moment()){
    this.week = moment().add(1,'week').startOf('week')
    this.fechaDia(dias)
  }
  return dia
 })
    this.data.dias.sort((a,b)=>{
      return a.fecha - b.fecha
    })
  }
 
  format(fecha){
    return moment(fecha).format('DD-MM-YYYY')
  }

  customAlertOptions: any = {
    translucent: true,
    cssClass:'alertdorado'
  };

  maxDate = moment().endOf('month').format('YYYY-MM-DD')
  minDate = moment().format('YYYY-MM-DD')
  
  hourChange(event){
    console.log(moment(event.value).format('HH:mm'));
    
    let min = moment().startOf('day').add(moment(event.value).format('HH:mm'),'hours')
    let max = moment(min).add(this.data.tiempo,'minutes').format('HH:mm')
  
    
    this.horarioForm.controls.max.setValue(max)
  }

}
