import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthGuardUsuarioService } from '../guards/auth-guard-usuario.service';

const routes: Routes = [
	{
		path: '',
		component: TabsPage,
		children: [
			{ path: 'inicio', loadChildren: '../cliente-pages/inicio/inicio.module#InicioPageModule', canActivate: [AuthGuardUsuarioService] },
			{
				path: 'calendario',
				loadChildren: '../cliente-pages/calendario/calendario.module#CalendarioPageModule',
				canActivate: [AuthGuardUsuarioService],
			},
			{
				path: 'plantillas',
				loadChildren: '../cliente-pages/plantillas/plantillas.module#PlantillasPageModule',
				canActivate: [AuthGuardUsuarioService],
			},
			{
				path: 'profile',
				loadChildren: '../cliente-pages/profile-tab/profile-tab.module#ProfileTabPageModule',
				canActivate: [AuthGuardUsuarioService],
			},
		],
	},
	{
		path: '',
		redirectTo: '/c/inicio',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TabsPageRoutingModule {}
