import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {
  constructor(
    private http:HttpClient
  ) { }
  
  
  getSeccionesByCategoriaID(id){
    return this.http.get(`${environment.URL_API}/seccion/secciones/${id}`)
  }
  
  crearSeccion(body){
    return this.http.post(`${environment.URL_API}/seccion/seccion`,body)
  }
  
  editarSeccion(id,body){
    return this.http.put(`${environment.URL_API}/seccion/seccion/${id}`,body)
  
  }
  eliminarSeccion(id,usuario){
    return this.http.delete(`${environment.URL_API}/seccion/seccion/${id}/${usuario}`)
  
  }

  getCategoria(id){
    return this.http.get(`${environment.URL_API}/categoria/categoria/${id}`)
  }

  getSeccion(id){
    return this.http.get(`${environment.URL_API}/seccion/seccion/${id}`)

  }
  

}
