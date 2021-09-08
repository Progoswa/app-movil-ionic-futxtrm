import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http:HttpClient) { }
  

  login(body){
    return this.http.post(`${environment.URL_API}/usuario/login`,body);
  }
  
  loginSocialNetwork(body){
    return this.http.post(`${environment.URL_API}/usuario/login-social-networks`,body);
  }
  
  
  authAdministrador(body){
    return this.http.post(`${environment.URL_API}/usuario/administradorauth`,body);
  }
  authAccount(body){
    return this.http.post(`${environment.URL_API}/usuario/auth-email`,body);
  }
  
  resendVerifyEmail(body){
    return this.http.post(`${environment.URL_API}/usuario/resend-auth-email`,body);
  }
  
  
  
}
