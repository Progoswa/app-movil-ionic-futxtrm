import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { UsuarioService } from './globals-services/usuario.service';
import { take, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	public selectedIndex = 0;
	public appPages = [
		{
			title: 'sidebar.home',
			url: '/c/inicio',
			icon: 'home',
		},
		{
			title: 'sidebar.calendar',
			url: '/c/calendario',
			icon: 'calendar',
		},
		{
			title: 'sidebar.templates',
			url: '/c/plantillas',
			icon: 'reader',
		},
	];
	public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
	usuario: any = null;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private router: Router,
		private socket: Socket,
		private usuarioService: UsuarioService,
		public translate: TranslateService
	) {
		this.initializeApp();
		translate.addLangs(['es', 'en']);
		translate.setDefaultLang('es');
		if (localStorage.getItem('lang') == null) {
			localStorage.setItem('lang', 'es');
			translate.use('es');
		} else {
			translate.use(localStorage.getItem('lang'));
		}
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.backgroundColorByHexString('#D0AE3D');
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	ngOnInit() {
		this.socket.connect();

		this.socket.on('login', (data) => {
			this.usuarioService.getUser(localStorage.getItem('id')).subscribe((resp: any) => {
				if (resp.ok) {
					this.usuario = resp.data;
				}
			});
		});
		const path = window.location.pathname.split('folder/')[1];
		if (path !== undefined) {
			this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
		}
	}

	ionViewWillEnter() {
		console.log('menu');
	}

	ngOnDestroy() {
		if (localStorage.getItem('remember') != 'true') {
			localStorage.clear();
		}
	}

	logout() {
		localStorage.clear();
		this.router.navigate(['/']);
	}
}
