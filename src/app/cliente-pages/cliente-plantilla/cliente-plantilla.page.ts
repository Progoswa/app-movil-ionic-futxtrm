import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PlantillaService } from 'src/app/globals-services/plantilla.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PdfMakeWrapper, Txt, Img, Table, Line, Columns } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts'; // fonts provided for pdfmake
import { File } from '@ionic-native/file/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import * as moment from 'moment';
import { EjercicioPipe } from 'src/app/ejercicio.pipe';
import { TranslateService } from '@ngx-translate/core';
@Component({
	selector: 'app-cliente-plantilla',
	templateUrl: './cliente-plantilla.page.html',
	styleUrls: ['./cliente-plantilla.page.scss'],
})
export class ClientePlantillaPage implements OnInit {
	id: any;
	plantilla: any;
	url: any;
	calendario: any;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private plantillaService: PlantillaService,
		private sanitizer: DomSanitizer,
		private file: File,
		private alertController: AlertController,
		private fileOpener: FileOpener,
		private loadingController: LoadingController,
		public translate: TranslateService
	) {
		route.queryParams.subscribe((data) => {
			this.id = data.id;
		});
	}

	ngOnInit() {}

	ionViewWillEnter() {
		console.log(this.id);
		this.getPlantilla(this.id);
	}
	getPlantilla(id: any) {
		this.plantillaService.getPlantilla(id).subscribe((resp: any) => {
			if (resp.ok) {
				console.log(resp);
				this.calendario = resp.calendario;
				this.plantilla = resp.plantilla;
				this.url = resp.url;
			}
		});
	}

	cancelar(): void {
		this.router.navigate(['/c/calendario'], { preserveFragment: false, replaceUrl: true });
	}

	uploadVimeo(id) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(
			`https://player.vimeo.com/video/${id}?autoplay=1&color=d0ae3d&byline=0&portrait=0`
		);
	}

	getTotalTime(plantilla) {
		// let cantidad = 0
		let minutos = 0;
		plantilla.plantilla.forEach((objeto) => {
			// cantidad += objeto.cantidad
			minutos += objeto.minutos * objeto.cantidad;
		});
		return minutos;
	}

	getTimeSeccion(seccion) {
		return seccion.minutos * seccion.cantidad;
	}

	formatTime(time) {
		let hour = moment().startOf('day').add(time, 'hours').hour();
		if (hour > 12) {
			return `${moment().startOf('day').add(time, 'hours').subtract(12, 'hours').format('HH:mm')} PM`;
		} else {
			return `${moment().startOf('day').add(time, 'hours').format('HH:mm')} AM`;
		}
	}

	async convertirPDF() {
		PdfMakeWrapper.setFonts(pdfFonts);

		const pdf = new PdfMakeWrapper();

		//   pdf.images({

		// });

		// pdf.watermark(new Txt('FutXtrm').color('#000').opacity(0.1).end )
		pdf.add(await new Img('assets/logon.png').height(75).width(200).alignment('center').build());

		pdf.pageOrientation('landscape');

		pdf.add(pdf.ln(1));

		pdf.add(
			new Columns([
				new Txt(`Categoria: ${this.calendario.categoria.nombre}`).end,
				new Txt(`Tipo de entrenamiento: ${new EjercicioPipe(this.translate).transform(this.calendario.condicional)}`).end,
			]).end
		);
		pdf.add(
			new Columns([
				new Txt(`Fecha: ${moment(this.calendario.dia).format('DD-MM-YYYY')}`).end,
				new Txt(`Hora de inicio: ${this.formatTime(this.calendario.horario.min)} -  ${this.formatTime(this.calendario.horario.max)}`).end,
			]).end
		);
		pdf.add(pdf.ln(1));
		pdf.add(
			new Table([[new Txt(`${this.plantilla.nombre}`).width('*').fontSize(15).color('#fff').alignment('center').end]])
				.layout({
					defaultBorder: false,
					fillColor: function (rowIndex, node, columnIndex) {
						return rowIndex === 0 ? '#909090' : null;
					},
				})
				.widths(['*']).end
		);

		for (const seccion of this.plantilla.plantilla) {
			console.log(seccion);

			pdf.add(
				new Table([
					[
						new Txt(`${seccion.seccion.nombre} (${this.getTimeSeccion(seccion)} min totales)`)
							.width('*')
							.fontSize(15)
							.color('#fff')
							.alignment('center').end,
					],
				])
					.layout({
						defaultBorder: false,
						fillColor: function (rowIndex, node, columnIndex) {
							return rowIndex === 0 ? '#D0AE3D' : null;
						},
					})
					.widths(['*']).end
			);

			pdf.add(
				new Table([
					[
						new Txt('Ejercicio').color('#000').bold().alignment('left').end,
						new Txt('Repeticiones').color('#000').bold().end,
						new Txt('Tiempo').color('#000').bold().alignment('center').end,
						new Txt('Descanso').color('#000').bold().alignment('center').end,
					],
				]).widths(['*', '*', '*', '*']).end
			);
			let table = [];

			for (const ejercicio of seccion.ejercicios) {
				table.push([
					new Txt(`${ejercicio.entrenamiento.ejercicio}`).alignment('left').end,
					new Txt(`${ejercicio.entrenamiento.repeticiones}`).alignment('center').end,
					new Txt(`${ejercicio.entrenamiento.tiempo} minutos`).alignment('center').end,
					new Txt(`${ejercicio.entrenamiento.descanso} segundos`).alignment('center').end,
				]);
			}
			pdf.add(
				new Table(table).widths(['*', '*', '*', '*']).layout({
					hLineWidth: () => {
						return 0.2;
					},
					vLineWidth: () => {
						return 0.2;
					},
				}).end
			);
		}

		const loading = await this.loadingController.create({
			cssClass: 'alertblack',
			message: 'cargando...',
			duration: 10000,
		});
		await loading.present();
		pdf.create().getBuffer((v) => {
			var blob = new Blob([v], { type: 'application/pdf' });

			this.file.writeFile(this.file.dataDirectory, this.plantilla.nombre, blob, { replace: true }).then(async (fileEntry) => {
				// Open the PDf with the correct OS tools
				loading.dismiss();

				this.fileOpener.open(this.file.dataDirectory + fileEntry.name, 'application/pdf');
				const toast = await this.alertController.create({
					cssClass: 'alertblack',
					header: 'Archivo PDF generado',
					message: 'PDF guardado en tu dispositivo',
				});
				toast.present();
			});
		});
	}
}
