import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(public http:HttpClient) { }

  getAllBitacora(){
    return this.http.get(`${environment.URL_API}/bitacora/bitacora`)
  }
  
  getBitacoraFilter(body){
    return this.http.post(`${environment.URL_API}/bitacora/bitacoraFilter`, body)
  }

  toExcel(){
    return this.http.get(`${environment.URL_API}/bitacora/toExcel`, { responseType: 'blob' })
  }

}
