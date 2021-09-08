import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/globals-services/categoria.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { LangsPage } from 'src/app/langs/langs.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-inicio',
	templateUrl: './inicio.page.html',
	styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
	categorias: any;
	categoriasAndTime: any;
	misCategorias: any = [];
	url: any;

	constructor(
		private categoriaService: CategoriaService,
		private router: Router,
		private alertController: AlertController,
		private popover: PopoverController,
		public translate: TranslateService
	) {
		translate.onLangChange.subscribe(() => {
			this.getCategorias();
		});
	}

	ionViewWillEnter() {
		this.getMyCategorias();
	}

	ngOnInit() {}

	getCategorias() {
		this.categoriaService.getCategorias(localStorage.getItem('lang')).subscribe((resp: any) => {
			if (resp.ok) {
				this.categorias = resp.categorias;

				const { categoriasAndTime } = resp;

				let NoLocks = [];
				let Locks = categoriasAndTime.filter((categoria) => {
					if (!this.misCategorias.includes(categoria.categoria._id)) {
						NoLocks.push(categoria);
					} else return categoria;
				});

				Promise.all(Locks);

				console.log(Locks.concat(NoLocks));

				this.categoriasAndTime = Locks.concat(NoLocks);
				this.url = resp.url;
			}
		});
	}

	getMyCategorias() {
		this.categoriaService.getMyCategorias(localStorage.getItem('id')).subscribe((resp: any) => {
			if (resp.ok) {
				resp.categorias.forEach((element) => {
					this.misCategorias.push(element.categoria);
				});

				this.getCategorias();
			}
		});
	}

	getImg(imagen: any) {
		return `${this.url}${imagen}`;
	}

	verCategoria(categoria: any, tiempo: any) {
		categoria.tiempo = tiempo;

		this.router.navigate(['/elegir'], { state: { categoria }, preserveFragment: false, replaceUrl: true });
	}

	async comprar() {
		let alert = await this.alertController.create({
			header: this.translate.instant('user.home.blocked.title'),
			message: this.translate.instant('user.home.blocked.msg'),
			cssClass: 'alertblack',
			buttons: [
				{
					text: this.translate.instant('user.home.blocked.button'),
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
