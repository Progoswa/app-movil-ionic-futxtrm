import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { CategoriaService } from 'src/app/globals-services/categoria.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CalendarioService } from 'src/app/globals-services/calendario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-predeterminada',
	templateUrl: './predeterminada.page.html',
	styleUrls: ['./predeterminada.page.scss'],
})
export class PredeterminadaPage implements OnInit {
	data: any;

	constructor(
		private categoriaService: CategoriaService,
		private fb: FormBuilder,
		private cd: ChangeDetectorRef,
		private calendarioService: CalendarioService,
		private router: Router,
		private route: ActivatedRoute,
		private alertController: AlertController,
		private translate: TranslateService
	) {
		this.data = router.getCurrentNavigation().extras.state.categoria;
	}

	ngOnInit() {
		console.log('==============================++++++++++++++++++++++++');
		this.fechaDia(this.data.dias);
	}

	week = moment().startOf('week');

	horarioForm = this.fb.group({
		min: ['', [Validators.required]],
		max: ['', [Validators.required]],
	});

	aceptar() {
		let calendario = {
			dias: this.data.dias,
			categoria: this.data._id,
			usuario: localStorage.getItem('id'),
			horario: this.horarioForm.value,
		};

		console.log(calendario);
		this.calendarioService.predeterminada(calendario).subscribe(async (resp: any) => {
			if (resp.ok) {
				this.router.navigate(['/calendario-plantilla'], { state: { plantillas: resp.plantillas } });
			} else {
				if (resp.err.code == 100) {
					// this.err('Limite superado','Solo puedes crear una plantilla diaria por categoria')
					let alert = await this.alertController.create({
						cssClass: 'alertblack',
						header: this.translate.instant('user.home.choose.default.limit.title'),
						message: this.translate.instant('user.home.choose.default.limit.subtitle'),
						buttons: [{ text: 'Okey', cssClass: 'button-alert' }],
					});

					alert.present();
				} else {
					// this.err('Algo salio mal','Ocurrio un error al intentar crear la plantilla, intente mas tarde')
					let alert = await this.alertController.create({
						cssClass: 'alertblack',
						header: this.translate.instant('user.home.choose.default.error.title'),
						message: this.translate.instant('user.home.choose.default.error.subtitle'),
						buttons: [{ text: 'Okey', cssClass: 'button-alert' }],
					});

					alert.present();
				}
			}
		});
	}

	fechaDia(dias: any[]) {
		this.data.dias = dias.map((dia) => {
			dia.fecha = moment(this.week).add(dia.dia, 'days');

			if (dia.fecha < moment()) {
				this.week = moment().add(1, 'week').startOf('week');
				this.fechaDia(dias);
			}
			return dia;
		});
		this.data.dias.sort((a, b) => {
			return a.fecha - b.fecha;
		});
	}

	format(fecha) {
		return moment(fecha).format('DD-MM-YYYY');
	}

	cancelar() {
		this.router.navigate(['/c/inicio'], { preserveFragment: false, replaceUrl: true });
	}

	maxDate = moment().endOf('month').format('YYYY-MM-DD');
	minDate = moment().format('YYYY-MM-DD');

	hourChange(event) {
		console.log(event);

		console.log(this.data);

		let min = moment().startOf('day').add(moment(event.detail.value).format('HH:mm'), 'hours');
		let max = moment(min).add(this.data.tiempo, 'minutes').format('HH:mm');

		this.horarioForm.controls.max.setValue(max);
	}
}
