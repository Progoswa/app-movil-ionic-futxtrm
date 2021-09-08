import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

constructor(
  private http:HttpClient
  
  ) { }

  getUser(id){
    return this.http.get(`${environment.URL_API}/usuario/usuario/${id}`)
  }

}
