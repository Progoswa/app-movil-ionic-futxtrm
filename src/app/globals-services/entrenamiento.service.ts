import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

constructor(
  private http:HttpClient
) { }


entrenamientosSeccion(body){
  return this.http.post(`${environment.URL_API}/entrenamiento/entrenamientosseccion`,body)
}

getEntrenamientosSeccion(id){
  return this.http.get(`${environment.URL_API}/entrenamiento/entrenamientosseccion/${id}`)
}

getEntrenamientos(){
  return this.http.get(`${environment.URL_API}/entrenamiento/entrenamientos`)
}

crearEntrenamiento(body){
  return this.http.post(`${environment.URL_API}/entrenamiento/entrenamiento`,body)
}

editarEntrenamiento(id,body){
  return this.http.put(`${environment.URL_API}/entrenamiento/entrenamiento/${id}`,body)

}
eliminarEntrenamiento(id,usuario){
  return this.http.delete(`${environment.URL_API}/entrenamiento/entrenamiento/${id}/${usuario}`)

}
eliminarEntrenamientoSeccion(id,usuario){
  return this.http.delete(`${environment.URL_API}/entrenamiento/entrenamientoseccion/${id}/${usuario}`)

}

uploadEntrenamientos(formData){
  return this.http.post(`${environment.URL_API}/entrenamiento/uploadEntrenamiento`,formData)
}

getEntrenamientosFilter(query){
  return this.http.post(`${environment.URL_API}/entrenamiento/entrenamientosfilter`,{query})

}

}
