import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import csc from 'country-state-city';

// Import Interfaces`
import { ICountry, IState, ICity } from 'country-state-city';
import { RegisterService } from './registro-servicios/register.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-registro',
	templateUrl: './registro.page.html',
	styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private registroService: RegisterService,
		private alertController: AlertController,
		public translate: TranslateService
	) {}

	ngOnInit() {
		this.getPaises();
	}

	paises = [];
	estados = [];
	ciudades = [];

	getPaises() {
		this.paises = csc.getAllCountries();
	}

	getEstados(pais) {
		this.estados = csc.getStatesOfCountry(pais.id);
	}

	getCitys(estado) {
		this.ciudades = csc.getCitiesOfState(estado.id);
	}

	customAlertOptions: any = {
		header: '',
		translucent: true,
		cssClass: 'alertdorado',
	};
	customAlertOptionse: any = {
		header: '',
		translucent: true,
		cssClass: 'alertdorado',
	};
	customAlertOptionsc: any = {
		header: '',
		translucent: true,
		cssClass: 'alertdorado',
	};

	clienteForm = this.fb.group(
		{
			nombre: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]],
			apellido: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]],
			email: [
				'',
				[
					Validators.required,
					Validators.maxLength(50),
					Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,}'),
				],
			],
			username: ['', [Validators.required, Validators.maxLength(50)]],
			password: [
				'',
				[
					Validators.required,
					Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/),
				],
			],
			rpassword: ['', [Validators.required, Validators.minLength(8)]],
			telefono: ['', [Validators.required]],
			direccion: ['', Validators.required],
			pais: ['', Validators.required],
			estado: ['', Validators.required],
			ciudad: ['', Validators.required],
		},
		{ validator: this.checkPasswords }
	);

	checkPasswords(form: FormGroup) {
		// funcion syncrona para verificar que las contraseñas coinciden
		let pass = form.controls.password.value;
		let confirmPass = form.controls.rpassword.value;
		if (pass !== confirmPass) {
			form.controls.rpassword.setErrors({ repeatInvalid: true });
		}

		return null;
	}

	resolved(captchaResponse: string) {
		console.log(`Resolved response token: ${captchaResponse}`);
	}

	register() {
		let cliente = this.clienteForm.value;
		cliente.role = 'usuario';
		cliente.nombre = cliente.nombre.substring(0, 1).toUpperCase() + cliente.nombre.substring(1);
		cliente.apellido = cliente.apellido.substring(0, 1).toUpperCase() + cliente.apellido.substring(1);
		cliente.pais = cliente.pais.name;
		cliente.estado = cliente.estado.name;
		cliente.ciudad = cliente.ciudad.name;


		this.registroService.register(cliente).subscribe((resp: any) => {

			if (resp.ok) {
				this.router.navigate(['/login']);
				this.registroSucces();
			} else {
				if (resp.err.code == 11000) {
					this.fieldRepeat(resp.index);
				} else {
				}
			}
		});
	}
	async registroSucces() {
		let alert = await this.alertController.create({
			header: this.translate.instant('sign_up.success.title'),
			message: this.translate.instant('sign_up.success.msg'),
			cssClass: 'alertblack',
			buttons: [
				{
					text: this.translate.instant('sign_up.success.button'),
					cssClass: 'button-alert',
				},
			],
		});

		alert.present();
	}

	async fieldRepeat(index) {
		let data;
		switch (index) {
			case 'email':
				data = {
					title: this.translate.instant('sign_up.error.email.title'),
					msg: this.translate.instant('sign_up.error.email.msg'),
				};
				break;

			case 'username':
				data = {
					title: this.translate.instant('sign_up.error.user.title'),
					msg: this.translate.instant('sign_up.error.user.msg'),
				};
				break;

			default:
				break;
		}
		let alert = await this.alertController.create({
			header: data.title,
			message: data.msg,
			cssClass: 'alertblack',
			buttons: [
				{
					text: 'Acepar',
					cssClass: 'button-alert',
				},
			],
		});

		alert.present();
	}
}
