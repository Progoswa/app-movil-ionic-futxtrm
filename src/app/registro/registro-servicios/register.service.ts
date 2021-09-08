import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http:HttpClient) { }

  register(body){
    return this.http.post(`${environment.URL_API}/usuario`,body);
  }
  
  registerSocial(body){
    return this.http.post(`${environment.URL_API}/usuario/social`,body);
  }

}
