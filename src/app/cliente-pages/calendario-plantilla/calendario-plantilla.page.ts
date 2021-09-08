import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/globals-services/categoria.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PlantillaService } from 'src/app/globals-services/plantilla.service';
import { AlertController } from '@ionic/angular';
import { CalendarioService } from 'src/app/globals-services/calendario.service';

import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-calendario-plantilla',
	templateUrl: './calendario-plantilla.page.html',
	styleUrls: ['./calendario-plantilla.page.scss'],
})
export class CalendarioPlantillaPage {
	id: any;
	categoria: any;
	secciones: any;
	url: any;
	calendario: any;
	calendarioid: any;

	customAlertOptions: any = {
		translucent: true,
		cssClass: 'alertdorado',
	};
	plantillas: any;
	plantillasToCharge: any[] = [];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private categoriaService: CategoriaService,
		private sanitizer: DomSanitizer,
		private plantillaService: PlantillaService,
		private alertController: AlertController,
		private calendarioService: CalendarioService,
		private translate: TranslateService
	) {
		if (router.getCurrentNavigation() != null) {
			if (router.getCurrentNavigation().extras.state != null) {
				this.plantillas = router.getCurrentNavigation().extras.state.plantillas;
				this.cargar();
			} else {
				this.router.navigate(['/c/inicio']);
			}
		} else {
			this.router.navigate(['/c/inicio']);
		}
	}

	cargar() {
		console.log(this.plantillas);

		this.plantilla = [];

		if (this.plantillas != undefined) {
			this.calendarioid = this.plantillas[0]._id;
			this.getCalendario(this.calendarioid);
		} else {
			this.router.navigate(['/c/inicio']);
		}
	}

	getCalendario(calendarioid: any) {
		this.calendarioService.getByID(calendarioid).subscribe((resp: any) => {
			if (resp.ok) {
				this.id = resp.calendario.categoria._id;
				this.calendario = resp.calendario;

				this.owner();
				this.getSecciones();
			}
		});
	}

	uploadVimeo(id) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(
			`https://player.vimeo.com/video/${id}?autoplay=1&color=d0ae3d&byline=0&portrait=0`
		);
	}
	DomSanitizer;

	getSecciones() {
		this.categoriaService.categoriaSecciones(this.id).subscribe((resp: any) => {
			if (resp.ok) {
				this.secciones = resp.secciones_entrenamientos;
				this.url = resp.url;
				console.log(this.secciones);

				this.secciones.forEach((seccion) => {
					this.plantilla.push({
						seccion: seccion.seccion._id,
						ejercicios: [],
						cantidad: seccion.bloque.ejercicios,
						minutos: seccion.bloque.minutos,
					});
				});
			}
		});
	}

	owner() {
		this.categoriaService
			.categoriaOwner({ categoria: this.id, usuario: localStorage.getItem('id') })
			.subscribe((resp: any) => {
				if (!resp.ok) {
					this.router.navigate(['/cliente']);
				} else {
					this.categoria = resp.categoria.categoria;
				}
			});
	}

	verSeccion(seccion) {
		console.log(seccion);
	}

	entrenamientoSelected(seccion, entrenamiento) {
		let ejercicio = this.plantilla.find((objeto) => {
			if (objeto.seccion == seccion) {
				return objeto.ejercicios.includes(entrenamiento);
			}
		});

		if (ejercicio == undefined) {
			return false;
		} else {
			return true;
		}
	}

	seccionCheck(seccion) {
		let seccionFind = this.plantilla.find((objeto) => {
			return objeto.seccion == seccion;
		});

		if (seccionFind.cantidad == seccionFind.ejercicios.length) {
			return true;
		} else {
			return false;
		}
	}

	formatDate(date) {
		return moment(date).utc(false).format('YYYY-MM-DD');
	}

	addToPlantilla(seccion, entrenamiento) {
		this.plantilla = this.plantilla.map((objeto) => {
			if (objeto.seccion == seccion) {
				let exist = objeto.ejercicios.find((ejercicio) => {
					if (ejercicio == entrenamiento) {
						return ejercicio;
					}
				});
				console.log(exist);

				if (exist == undefined) {
					if (objeto.ejercicios.length < objeto.cantidad) {
						objeto.ejercicios.push(entrenamiento);
					} else {
						this.cantidadmaxima();
					}
				} else {
					objeto.ejercicios = objeto.ejercicios.filter((ejercicio) => {
						return ejercicio != entrenamiento;
					});
				}
			}
			return objeto;
		});
	}

	async cantidadmaxima() {
		let alert = await this.alertController.create({
			cssClass: 'alertblack',
			header: this.translate.instant('user.calendar.template.max.title'),
			message: this.translate.instant('user.calendar.template.max.subtitle'),
			buttons: [{ text: this.translate.instant('accept'), cssClass: 'button-alert' }],
		});

		alert.present();
	}

	plantilla = [];

	async generarPlantilla() {
		console.log(this.translate.instant('user.calendar.template.generate'));
		console.log(this.translate.instant('user.calendar.template.name.subtitle'));
		console.log(this.plantilla);

		let alert = await this.alertController.create({
			cssClass: 'alertblack',
			header: this.translate.instant('user.calendar.template.generate'),
			message: this.translate.instant('user.calendar.template.name.subtitle'),
			inputs: [
				{
					name: this.translate.instant('user.calendar.template.name.title'),
					type: 'text',
					placeholder: this.translate.instant('user.calendar.template.name.title'),
				},
			],
			buttons: [
				{
					text: this.translate.instant('accept'),
					cssClass: 'button-alert',
					handler: (data: any) => {
						this.plantillaService
							.nuevaPlantilla({
								usuario: localStorage.getItem('id'),
								plantilla: this.plantilla,
								nombre: data.nombre,
								categoria: this.id,
							})
							.subscribe(async (resp: any) => {
								console.log('resp-----------------');

								console.log(resp);

								if (resp.ok) {
									this.calendario.plantilla = resp.plantilla._id;
									this.plantillasToCharge.push({ calendarioID: this.calendarioid, calendario: this.calendario });
									if (this.plantillas.length > 1) {
										this.plantillas = this.plantillas.filter((plantilla) => {
											return plantilla._id != this.calendarioid;
										});
										this.cargar();
									} else {
										this.plantillasToCharge.forEach((obj) => {
											this.calendarioService.setPlantilla(obj.calendarioID, obj.calendario).subscribe();
										});
										this.router.navigate(['/c/plantillas'], { preserveFragment: false, replaceUrl: true });
									}

									let alert = await this.alertController.create({
										cssClass: 'alertblack',
										header: this.translate.instant('user.calendar.template.success.title'),
										message: this.translate.instant('user.calendar.template.success.subtitle'),
										buttons: [{ text: this.translate.instant('accept'), cssClass: 'button-alert' }],
									});

									alert.present();
								} else {
									if (resp.err.code == 10) {
										let alert = await this.alertController.create({
											cssClass: 'alertblack',
											header: this.translate.instant('user.calendar.template.limit.title'),
											message: this.translate.instant('user.calendar.template.limit.subtitle'),
											buttons: [{ text: this.translate.instant('accept'), cssClass: 'button-alert' }],
										});

										alert.present();
									} else {
										let alert = await this.alertController.create({
											cssClass: 'alertblack',
											header: this.translate.instant('user.calendar.template.error.title'),
											message: this.translate.instant('user.calendar.template.error.subtitle'),
											buttons: [{ text: this.translate.instant('accept'), cssClass: 'button-alert' }],
										});

										alert.present();
									}
								}
							});
					},
				},
			],
		});

		alert.present();
	}

	changeBloque(bloque, seccion) {
		console.log(bloque);

		this.plantilla = this.plantilla.map((objeto) => {
			if (objeto.seccion == seccion) {
				objeto.cantidad = bloque.ejercicios;
				objeto.minutos = bloque.minutos;
				objeto.ejercicios = [];
			}
			return objeto;
		});
	}

	condicionChange(seccion) {
		this.plantilla = this.plantilla.map((objeto) => {
			if (objeto.seccion == seccion.seccion._id) {
				objeto.ejercicios = [];
			}
			return objeto;
		});
	}

	canGenerate() {
		const can = this.plantilla.find((objeto) => objeto.cantidad != objeto.ejercicios.length);
		return !can ? false : true;
	}
}
