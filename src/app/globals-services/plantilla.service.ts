import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantillaService {

constructor(
  private http:HttpClient
) { }


nuevaPlantilla(body){
  return this.http.post(`${environment.URL_API}/plantilla/plantilla`,body)
}

misPlantillas(id){
  return this.http.get(`${environment.URL_API}/plantilla/usuario/${id}`)
}

getPlantilla(id){
  return this.http.get(`${environment.URL_API}/plantilla/plantilla/${id}`)

}

deletePlantilla(id){
  return this.http.delete(`${environment.URL_API}/plantilla/plantilla/${id}`)

}
}
