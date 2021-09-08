import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/globals-services/categoria.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PlantillaService } from 'src/app/globals-services/plantilla.service';
import { AlertController } from '@ionic/angular';

@Component({
	selector: 'app-cliente-categoria',
	templateUrl: './cliente-categoria.page.html',
	styleUrls: ['./cliente-categoria.page.scss'],
})
export class ClienteCategoriaPage implements OnInit {
	id: any;
	categoria: any;
	secciones: any;
	url: any;

	customAlertOptions: any = {
		header: 'tipo de ejercicio',
		translucent: true,
		cssClass: 'alertdorado',
	};

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private categoriaService: CategoriaService,
		private sanitizer: DomSanitizer,
		private plantillaService: PlantillaService,
		private alertController: AlertController
	) {
		route.queryParams.subscribe((data) => {
			this.id = data.id;
		});
	}

	ngOnInit() {
		this.owner();
		this.getSecciones();
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
					console.log('ya existe');

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
			header: 'Cantidad maxima',
			message: 'No puedes seleccionar mas videos de esta seccion',
			buttons: [{ text: 'Aceptar', cssClass: 'button-alert' }],
		});

		alert.present();
	}

	plantilla = [];

	async generarPlantilla() {
		let alert = await this.alertController.create({
			cssClass: 'alertblack',
			header: 'Generar plantilla    ',
			message: 'Nombre de la plantilla',
			inputs: [
				{
					name: 'nombre',
					type: 'text',
					placeholder: 'Nombre',
				},
			],
			buttons: [
				{
					text: 'Aceptar',
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
								if (resp.ok) {
									this.router.navigate(['/cliente/plantilla'], { queryParams: { id: resp.plantilla._id } });
									let alert = await this.alertController.create({
										cssClass: 'alertblack',
										header: 'Plantilla generada',
										message: 'Su plantilla se genero correctamente',
										buttons: [{ text: 'Aceptar', cssClass: 'button-alert' }],
									});

									alert.present();
								} else {
									if (resp.err.code == 10) {
										let alert = await this.alertController.create({
											cssClass: 'alertblack',
											header: 'Limite excedido',
											message: 'Solo puede crear una plantilla diaria por categoria',
											buttons: [{ text: 'Aceptar', cssClass: 'button-alert' }],
										});

										alert.present();
									} else {
										let alert = await this.alertController.create({
											cssClass: 'alertblack',
											header: 'Algo salio mal',
											message: 'Su plantilla no se pudo generar intente mas tarde',
											buttons: [{ text: 'Aceptar', cssClass: 'button-alert' }],
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
		let can = this.plantilla.find((objeto) => {
			return objeto.cantidad != objeto.ejercicios.length;
		});

		return can == undefined ? true : false;
	}
}
