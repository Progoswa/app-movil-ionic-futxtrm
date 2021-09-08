import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LangsPage } from '../langs/langs.page';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	constructor(
		private fb: FormBuilder,
		private loginService: LoginService,
		public alertController: AlertController,
		private router: Router,
		public translate: TranslateService,
		private popover: PopoverController
	) {}

	loginForm = this.fb.group({
		usuario: ['', [Validators.required]],
		password: ['', [Validators.required]],
		remember: [false],
	});

	ngOnInit() {}

	ingresar() {
		this.loginService.login(this.loginForm.value).subscribe(async (resp: any) => {
			console.log(resp);

			if (resp.ok) {
				if (this.loginForm.value.remember) {
					localStorage.setItem('remember', 'true');
				}
				if (resp.verify && resp.status) {
					localStorage.setItem('id', resp.id);
					switch (resp.role) {
						case 'administrador':
							this.alert('login.wrong.title', 'login.wrong.msg', 'login.wrong.button');
							break;
						case 'usuario':
							this.router.navigate(['/c/inicio']);
							break;

						default:
							break;
					}
				} else if (!resp.status) {
					this.alert('login.blocked.title', 'login.blocked.msg', 'login.blocked.button');
				} else if (!resp.verify) {
					this.alert('login.unverified.title', 'login.unverified.msg', 'login.unverified.button');
				}
			} else {
				this.alert('login.wrong.title', 'login.wrong.msg', 'login.wrong.button');
			}
		});
	}

	async alert(header, message, button) {
		let alert = await this.alertController.create({
			header: this.translate.instant(header),
			cssClass: 'alertblack',
			message: this.translate.instant(message),
			buttons: [
				{
					text: this.translate.instant(button),
					cssClass: 'button-alert',
				},
			],
		});
		alert.present();
	}

	async langs() {
		let langs = await this.popover.create({
			component: LangsPage,
			translucent: true,
		});

		langs.present();
	}
}
