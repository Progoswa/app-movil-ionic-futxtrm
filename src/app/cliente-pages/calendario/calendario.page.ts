import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { CategoriaService } from 'src/app/globals-services/categoria.service';
import { CalendarioService } from 'src/app/globals-services/calendario.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { CategoriaCalendarioPage } from '../categoria-calendario/categoria-calendario.page';
@Component({
	selector: 'app-calendario',
	templateUrl: './calendario.page.html',
	styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
	daySunday: Number;
	calendarios: any = [];
	categorias: any;
	categoria: any;
	view: number = 3;
	referent_day;
	mes_actual: number = parseInt(moment().format('MM'));
	mes_actual_respaldo: number = parseInt(moment().format('MM'));
	anno_init: number = parseInt(moment().format('YYYY'));
	calendar: Array<any> = [];
	today: string = moment().format('DD');
	referent_year: number = 0;
	days_colors_state = {
		sun: false,
		mon: false,
		tue: false,
		wed: false,
		thu: false,
		fri: false,
		sat: false,
	};

	array_days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

	constructor(
		private categoriaService: CategoriaService,
		private router: Router,
		private calendarioService: CalendarioService,
		private alertController: AlertController,
		private translate: TranslateService
	) {}

	ngOnInit() {
		this.misPlantillas();
		this.generateWeek();
		this.getCategorias();
	}

	getCategorias() {
		this.categoriaService.getMyCategoriasInfo(localStorage.getItem('id')).subscribe((resp: any) => {
			if (resp.ok) {
				this.categorias = resp.categorias;
			}
		});
	}

	misPlantillas() {
		this.calendarioService.getMyCalendarios(localStorage.getItem('id')).subscribe((resp: any) => {
			if (resp.ok) {
				resp.calendarios.forEach((calendario) => {
					if (calendario.plantilla != null && calendario.plantilla.borrado == false) {
						this.calendarios.push(calendario);

						this.calendar_data();
					}
				});
			}
		});
	}

	dataSource: any;
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	async clase(one, two) {
		// const n = await this.getByDate(one, two).condicional;
		// switch (n) {
		// 	case 1:
		// 		resp += 'futxtrm-color-verde';
		// 		break;
		// 	case 2:
		// 		resp += 'futxtrm-color-dorado';
		// 		break;
		// 	case 3:
		// 		resp += 'futxtrm-color-azul';
		// 		break;
		// 	case 4:
		// 		resp += 'futxtrm-color-gris';
		// 		break;
		// 	case 5:
		// 		resp += 'futxtrm-color-rosa';
		// 		break;
		// }
	}

	getByDate(fecha, hora) {
		let start = moment(this.currentDay).startOf('week');

		let plantilla = this.calendarios.find((calendario) => {
			let min = calendario.horario.min.split(':');
			min = Number(`${min[0]}${min[1]}`);

			let max = calendario.horario.max.split(':');
			max = Number(`${max[0]}${max[1]}`);

			let dia = moment(calendario.dia).utc(false).format('YYYY-MM-DD');
			let diaQuery = moment(start).add(fecha, 'days').format('YYYY-MM-DD');

			return dia == diaQuery && min <= hora && hora <= max;
		});

		return plantilla != undefined ? plantilla : null;
	}
	day = [];

	generateWeek() {
		this.daySunday = Number(moment().startOf('week').format('DD'));

		let hour = 800;

		for (let i = 0; i < 15; i++) {
			this.day.push({
				hora: hour,
				domingo: null,
				lunes: null,
				martes: null,
				miercoles: null,
				jueves: null,
				viernes: null,
				sabado: null,
			});
			hour += 100;
		}

		console.log('DATA');
		console.log(this.day);
	}

	edit_calendar(n: number) {
		switch (n) {
			case 0:
				this.mes_actual = this.mes_actual_respaldo;
				this.changeWeek(0);
				break;
			case 1:
				this.mes_actual = this.mes_actual + 1;
				this.changeWeek(1);

				if (this.mes_actual > 12) {
					this.mes_actual = 1;
					this.anno_init = this.anno_init + 1;
				}
				break;
			case -1:
				this.changeWeek(-1);

				this.mes_actual = this.mes_actual - 1;
				if (this.mes_actual < 1) {
					this.mes_actual = 12;
					this.anno_init = this.anno_init - 1;
				}
				break;
		}
		this.calendar_data();
	}

	de_dia_a_mes() {
		this.mes_actual = this.currentMonth;

		this.calendar_data();
		// this.mes_name();
		this.view = 1;
	}

	calendar_data() {
		moment.locale('es');

		const pre_calender = [];
		const data_init = `${this.mes_actual}/01/${this.anno_init}`;

		const alerts = [];

		this.calendarios.forEach((calendario) => alerts.push(moment(calendario.dia).format('L')));

		Promise.all(alerts);

		let i = 0;
		let mes_end;
		do {
			moment.locale('es');

			let alert = false;
			let today = false;
			if (alerts.indexOf(moment(data_init).add(i, 'days').format('L')) != -1) {
				alert = true;
			}

			if (moment(data_init).add(i, 'days').format('DD') === this.today) {
				if (moment(data_init).add(i, 'days').format('MM') === `${this.mes_actual_respaldo}`) {
					today = true;
				}
			}

			pre_calender.push({
				name: moment(data_init).add(i, 'days').format('dddd'),
				n: moment(data_init).add(i, 'days').format('DD'),
				date: moment(data_init).add(i, 'days').format('L'),
				alert,
				today,
			});

			mes_end = moment(data_init).add(i, 'days').format('MM');

			i = i + 1;
		} while (mes_end == this.mes_actual);

		pre_calender.splice(pre_calender.length - 1, 1);

		let calendar_data;
		let pre;

		switch (pre_calender[0].name) {
			case 'domingo':
				calendar_data = pre_calender;
				break;
			case 'lunes':
				pre = [{ name: '', n: '' }];
				calendar_data = pre.concat(pre_calender);
				break;
			case 'martes':
				pre = [
					{ name: '', n: '' },
					{ name: '', n: '' },
				];
				calendar_data = pre.concat(pre_calender);
				break;
			case 'miércoles':
				pre = [
					{ name: '', n: '' },
					{ name: '', n: '' },
					{ name: '', n: '' },
				];
				calendar_data = pre.concat(pre_calender);
				break;
			case 'jueves':
				pre = [
					{ name: '', n: '' },
					{ name: '', n: '' },
					{ name: '', n: '' },
					{ name: '', n: '' },
				];
				calendar_data = pre.concat(pre_calender);
				break;
			case 'viernes':
				pre = [
					{ name: '', n: '' },
					{ name: '', n: '' },
					{ name: '', n: '' },
					{ name: '', n: '' },
					{ name: '', n: '' },
				];
				calendar_data = pre.concat(pre_calender);
				break;
			case 'sábado':
				pre = [
					{ name: '', n: '' },
					{ name: '', n: '' },
					{ name: '', n: '' },
					{ name: '', n: '' },
					{ name: '', n: '' },
					{ name: '', n: '' },
				];
				calendar_data = pre.concat(pre_calender);
				break;
		}

		switch (moment().format('dddd')) {
			case 'domingo':
				this.referent_day = 1;
				break;
			case 'lunes':
				this.referent_day = 2;
				break;
			case 'martes':
				this.referent_day = 3;
				break;
			case 'miércoles':
				this.referent_day = 4;
				break;
			case 'jueves':
				this.referent_day = 5;
				break;
			case 'viernes':
				this.referent_day = 6;
				break;
			case 'sábado':
				this.referent_day = 7;
				break;
		}

		this.days_colors();

		const pro = 43 - calendar_data.length;

		for (let i = 1; i < pro; i++) calendar_data.push({ name: '', n: '' });

		let resp = [];
		let resp_unid = [];

		let j = 0;
		do {
			resp_unid = [];
			for (let k = 1; k < 8; k++) {
				resp_unid.push(calendar_data[j]);
				j++;
			}
			resp.push(resp_unid);
		} while (j < calendar_data.length);

		this.calendar = resp;
	}

	meses = [
		{ mes: 1, nombre: 'ENE', complet: 'enero' },
		{ mes: 2, nombre: 'FEB', complet: 'febrero' },
		{ mes: 3, nombre: 'MAR', complet: 'marzo' },
		{ mes: 4, nombre: 'ABR', complet: 'abril' },
		{ mes: 5, nombre: 'MAY', complet: 'mayo' },
		{ mes: 6, nombre: 'JUN', complet: 'junio' },
		{ mes: 7, nombre: 'JUL', complet: 'julio' },
		{ mes: 8, nombre: 'AGO', complet: 'agosto' },
		{ mes: 9, nombre: 'SEP', complet: 'septiembre' },
		{ mes: 10, nombre: 'OCT', complet: 'octubre' },
		{ mes: 11, nombre: 'NOV', complet: 'noviembre' },
		{ mes: 12, nombre: 'DIC', complet: 'diciembre' },
	];

	currentMonth = moment().month() + 1;

	monthFormat(month) {
		return this.translate.instant(`months_short.${month}`);
	}

	currentDay = moment().format('YYYY-MM-DD');

	yearFormat(day) {
		return moment(day).add(this.referent_year, 'years').format('YYYY');
	}

	changeWeek(direccion: any) {
		if (direccion == 0) {
			this.currentDay = moment().format('YYYY-MM-DD');
			this.currentMonth = moment().month() + 1;
			this.referent_year = 0;
		} else {
			let dia_referen = moment(this.currentDay).format('DD');
			if (this.currentMonth === 12 && direccion === 1 && dia_referen === '31') {
				this.referent_year = this.referent_year + 1;
			} else if (this.currentMonth === 1 && direccion === -1 && dia_referen === '01') {
				this.referent_year = this.referent_year - 1;
			}
			this.currentDay = moment(this.currentDay)
				.add(7 * direccion, 'days')
				.format('YYYY-MM-DD');
			this.currentMonth =
				moment(this.currentDay)
					.add(7 * direccion, 'days')
					.month() + 1;
		}
	}

	days_colors() {
		const day = this.array_days[this.referent_day - 1];

		for (const key in this.days_colors_state) {
			if (key === day) {
				this.days_colors_state[key] = true;
			} else {
				this.days_colors_state[key] = false;
			}
		}
	}

	view_day(i: number) {
		switch (i) {
			case 0:
				switch (moment().format('dddd')) {
					case 'domingo':
						this.referent_day = 1;
						break;
					case 'lunes':
						this.referent_day = 2;
						break;
					case 'martes':
						this.referent_day = 3;
						break;
					case 'miércoles':
						this.referent_day = 4;
						break;
					case 'jueves':
						this.referent_day = 5;
						break;
					case 'viernes':
						this.referent_day = 6;
						break;
					case 'sábado':
						this.referent_day = 7;
						break;
				}

				this.changeWeek(0);
				break;
			case 1:
				this.referent_day = this.referent_day + 1;
				if (this.referent_day > 7) {
					this.referent_day = 1;
					this.changeWeek(1);
				}
				break;
			case -1:
				this.referent_day = this.referent_day - 1;
				if (this.referent_day < 1) {
					this.referent_day = 7;
					this.changeWeek(-1);
				}
				break;
		}

		this.days_colors();
	}

	getDay(day) {
		let starOf = moment(this.currentDay).startOf('week');

		return moment(starOf).add(day, 'days').format('D');
	}

	add() {
		this.router.navigate(['/categoria-calendario'], {
			queryParams: { week: this.currentDay },
			preserveFragment: false,
			replaceUrl: true,
		});
	}

	// async add() {
	// 	const alert = await this.alertController.create({
	// 		cssClass: 'my-custom-class',
	// 		header: 'Alert',
	// 		subHeader: 'Subtitle',
	// 		message: ``,
	// 		buttons: ['OK'],
	// 	});

	// 	await alert.present();
	// }

	async verPlantilla(plantilla) {
		if (plantilla.plantilla.borrado == false) {
			this.router.navigate(['/cliente/plantilla'], {
				queryParams: { id: plantilla.plantilla._id },
				preserveFragment: false,
				replaceUrl: true,
			});
		} else {
			let alert = await this.alertController.create({
				cssClass: 'alertblack',
				header: 'La plantilla no existe',
				message: 'Esta plantilla expiro o fue eliminada',
				buttons: [{ cssClass: 'button-alert', text: 'Aceptar' }],
			});
			alert.present();
		}
	}
}
