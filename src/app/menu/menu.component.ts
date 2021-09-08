import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
	public selectedIndex = 0;
	public appPages = [
		{ 
			title: 'Inicio',
			url: '/inicio',
			icon: 'home',
		},
		{
			title: 'Calendario',
			url: '/calendario',
			icon: 'calendar',
		},
		{
			title: 'Plantillas',
			url: '/plantillas',
			icon: 'reader',
		},
	];

	constructor(private router: Router) {}

	ngOnInit() {
		const path = window.location.pathname.split('folder/')[1];
		if (path !== undefined) {
			this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
		}
	}

	logout() {
		localStorage.clear();
		this.router.navigate(['/']);
	}
}
