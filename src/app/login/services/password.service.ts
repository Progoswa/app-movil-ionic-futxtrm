import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PasswordService {

constructor(
  public http:HttpClient
) { }

recoveryPassword(body){
  return this.http.post(`${environment.URL_API}/usuario/recovery-password`,body)
}

authRecoveryPassword(body){
  return this.http.post(`${environment.URL_API}/usuario/recovery-password-auth`,body)
}

setNewPassword(body){
  return this.http.post(`${environment.URL_API}/usuario/recovery-password-set`,body)
}

}
