import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-profile-tab',
	templateUrl: './profile-tab.page.html',
	styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {
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
		private statusBar: StatusBar,
		private router: Router,
		private socket: Socket,
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

	initializeApp() {}

	ngOnInit() {}

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
