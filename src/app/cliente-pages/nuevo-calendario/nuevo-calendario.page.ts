import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { CategoriaService } from 'src/app/globals-services/categoria.service';
import { CalendarioService } from 'src/app/globals-services/calendario.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { CategoriaCalendarioPage } from '../categoria-calendario/categoria-calendario.page';
@Component({
	selector: 'app-nuevo-calendario',
	templateUrl: './nuevo-calendario.page.html',
	styleUrls: ['./nuevo-calendario.page.scss'],
})
export class NuevoCalendarioPage implements OnInit {
	daySunday: Number;
	calendarios: any = [];
	categorias: any;
	categoria: any;

	constructor(
		private categoriaService: CategoriaService,
		private router: Router,
		private calendarioService: CalendarioService,
		private alertController: AlertController,
		private translate: TranslateService
	) {}

	ngOnInit() {
		this.generateWeek();
		this.misPlantillas();
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
	}

	meses = [
		{ mes: 1, nombre: 'ENE' },
		{ mes: 2, nombre: 'FEB' },
		{ mes: 3, nombre: 'MAR' },
		{ mes: 4, nombre: 'ABR' },
		{ mes: 5, nombre: 'MAY' },
		{ mes: 6, nombre: 'JUN' },
		{ mes: 7, nombre: 'JUL' },
		{ mes: 8, nombre: 'AGO' },
		{ mes: 9, nombre: 'SEP' },
		{ mes: 10, nombre: 'OCT' },
		{ mes: 11, nombre: 'NOV' },
		{ mes: 12, nombre: 'DIC' },
	];

	currentMonth = moment().month() + 1;

	monthFormat(month) {
		return this.translate.instant(`months_short.${month}`);
	}

	currentDay = moment().format('YYYY-MM-DD');

	yearFormat(day) {
		return moment(day).format('YYYY');
	}

	changeWeek(direccion: any) {
		if (direccion == 0) {
			this.currentDay = moment().format('YYYY-MM-DD');
			this.currentMonth = moment().month() + 1;
		} else {
			this.currentDay = moment(this.currentDay)
				.add(7 * direccion, 'days')
				.format('YYYY-MM-DD');
			this.currentMonth =
				moment(this.currentDay)
					.add(7 * direccion, 'days')
					.month() + 1;
		}
	}

	getDay(day) {
		let starOf = moment(this.currentDay).startOf('week');

		return moment(starOf).add(day, 'days').format('DD');
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
