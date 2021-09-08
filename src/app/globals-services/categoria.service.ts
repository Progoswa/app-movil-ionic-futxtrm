import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CategoriaService {
	constructor(private http: HttpClient) {}

	getCategorias(lang) {
		return this.http.get(`${environment.URL_API}/categoria/categorias/${lang}`);
	}

	crearCategoria(body) {
		return this.http.post(`${environment.URL_API}/categoria/categoria`, body);
	}

	editarCategoria(id, body) {
		return this.http.put(`${environment.URL_API}/categoria/categoria/${id}`, body);
	}
	eliminarCategoria(id, usuario) {
		return this.http.delete(`${environment.URL_API}/categoria/categoria/${id}/${usuario}`);
	}

	comprarCategoria(body) {
		return this.http.post(`${environment.URL_API}/categoria/comprar`, body);
	}

	getMyCategorias(id) {
		return this.http.get(`${environment.URL_API}/categoria/miscategorias/${id}`);
	}

	getMyCategoriasInfo(id: string) {
		return this.http.get(`${environment.URL_API}/categoria/categoriasinfo/${id}`);
	}

	categoriaOwner(body) {
		return this.http.post(`${environment.URL_API}/categoria/categoriaowner`, body);
	}
	categoriaSecciones(id) {
		return this.http.get(`${environment.URL_API}/categoria/secciones/${id}`);
	}
}
