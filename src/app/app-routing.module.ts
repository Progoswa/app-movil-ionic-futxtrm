import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardUsuarioService } from './guards/auth-guard-usuario.service';
import { SessionGuardService } from './guards/session-guard.service';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
		canActivate: [SessionGuardService],
	},
	{
		path: 'folder/:id',
		loadChildren: () => import('./folder/folder.module').then((m) => m.FolderPageModule),
	},
	{
		path: 'login',
		loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
		canActivate: [SessionGuardService],
	},
	{
		path: 'c',
		loadChildren: './tabs/tabs.module#TabsPageModule',
		canActivate: [AuthGuardUsuarioService],
	},
	{
		path: 'recuperar-password',
		loadChildren: () => import('./recuperar-password/recuperar-password.module').then((m) => m.RecuperarPasswordPageModule),
	},
	{
		path: 'inicio',
		loadChildren: () => import('./cliente-pages/inicio/inicio.module').then((m) => m.InicioPageModule),
		canActivate: [AuthGuardUsuarioService],
	},
	{
		path: 'calendario',
		loadChildren: () => import('./cliente-pages/calendario/calendario.module').then((m) => m.CalendarioPageModule),
		canActivate: [AuthGuardUsuarioService],
	},
	{
		path: 'plantillas',
		loadChildren: () => import('./cliente-pages/plantillas/plantillas.module').then((m) => m.PlantillasPageModule),
		canActivate: [AuthGuardUsuarioService],
	},
	{
		path: 'cliente/plantilla',
		loadChildren: () => import('./cliente-pages/cliente-plantilla/cliente-plantilla.module').then((m) => m.ClientePlantillaPageModule),
	},
	{
		path: 'cliente/categoria',
		loadChildren: () => import('./cliente-pages/cliente-categoria/cliente-categoria.module').then((m) => m.ClienteCategoriaPageModule),
	},
	{
		path: 'categoria-calendario',
		loadChildren: () =>
			import('./cliente-pages/categoria-calendario/categoria-calendario.module').then((m) => m.CategoriaCalendarioPageModule),
	},
	{
		path: 'calendario-plantilla',
		loadChildren: () =>
			import('./cliente-pages/calendario-plantilla/calendario-plantilla.module').then((m) => m.CalendarioPlantillaPageModule),
	},
	{
		path: 'tabs',
		loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsPageModule),
	},
	{
		path: 'registro',
		loadChildren: () => import('./registro/registro.module').then((m) => m.RegistroPageModule),
	},
	{
		path: 'elegir',
		loadChildren: () => import('./cliente-pages/elegir/elegir.module').then((m) => m.ElegirPageModule),
	},
	{
		path: 'predeterminada',
		loadChildren: () => import('./cliente-pages/predeterminada/predeterminada.module').then((m) => m.PredeterminadaPageModule),
	},
	{
		path: 'personalizada',
		loadChildren: () => import('./cliente-pages/personalizada/personalizada.module').then((m) => m.PersonalizadaPageModule),
	},  {
    path: 'profile-tab',
    loadChildren: () => import('./cliente-pages/profile-tab/profile-tab.module').then( m => m.ProfileTabPageModule)
  },
  {
    path: 'nuevo-calendario',
    loadChildren: () => import('./cliente-pages/nuevo-calendario/nuevo-calendario.module').then( m => m.NuevoCalendarioPageModule)
  },

];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
