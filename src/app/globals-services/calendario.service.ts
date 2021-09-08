import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CalendarioService {
	constructor(private http: HttpClient) {}

	create(body) {
		return this.http.post(`${environment.URL_API}/calendario/calendario`, body);
	}

	predeterminada(body) {
		return this.http.post(`${environment.URL_API}/calendario/predeterminada`, body);
	}

	getByID(id) {
		return this.http.get(`${environment.URL_API}/calendario/calendario/${id}`);
	}

	setPlantilla(id, body) {
		return this.http.put(`${environment.URL_API}/calendario/calendario/${id}`, body);
	}

	getMyCalendarios(id) {
		return this.http.get(`${environment.URL_API}/calendario/usuario/${id}`);
	}
}
