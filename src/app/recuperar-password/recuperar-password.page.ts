import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from '../login/services/password.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private passwordService:PasswordService,
    private alertController:AlertController,
    public loadingController: LoadingController,
    public translate:TranslateService
  ) { }

  async ngOnInit() {
    
  }

  recoveryForm = this.fb.group({
    email:['',[Validators.email]]
  })

  async recuperar(){
    const loading = await this.loadingController.create({
      cssClass: 'alertblack',
      message: 'cargando...',
      
    });
    await loading.present();
    this.passwordService.recoveryPassword(this.recoveryForm.value).subscribe(async (resp:any)=>{
      loading.dismiss()

      console.log(resp);
      
      if(resp.ok){
        
        
        this.router.navigate(['/'])
        this.alert("recover_password.success.title","recover_password.success.msg","recover_password.success.button")

      }else{
        if(resp.user == null){
          this.alert("recover_password.failed.title","recover_password.failed.msg","recover_password.failed.button")
        }
      }
    })
  }

  async alert(header,message,button){
    let alert = await this.alertController.create({
      header:this.translate.instant(header),
      cssClass:'alertblack',
      message: this.translate.instant(message),
      buttons: [{
        text:this.translate.instant(button),
        cssClass:'button-alert'
      }]
    })
    alert.present()
  }
}
