import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

constructor(private http:HttpClient) { }


getUser(id){
  return this.http.get(`${environment.URL_API}/usuario/usuario/${id}`)
}

getUserByRole(role){
  return this.http.get(`${environment.URL_API}/usuario/usuarioRole/${role}`)
}

getUsers(){
  return this.http.get(`${environment.URL_API}/usuario/`)
}

updatePerfilUser(id,body){
  return this.http.put(`${environment.URL_API}/usuario/perfil/${id}`,body)
}

updateRolAdminById(id, body){
  return this.http.put(`${environment.URL_API}/usuario/updateRolAdminById/${id}`, body) 
}

updateUserByAdmin(body){
  return this.http.put(`${environment.URL_API}/usuario/updateUserByAdmin`,body) 
}
updateSeguridadUser(id,body){
  return this.http.put(`${environment.URL_API}/usuario/seguridad/${id}`,body)
}

uploadImage(formData){
  return this.http.post(`${environment.URL_API}/usuario/uploadImageById`,formData)
}

updateStatusUsuario(body){
  return this.http.post(`${environment.URL_API}/usuario/status`,body)
 
}

delete(id,idAdmin){
    
  return this.http.delete(`${environment.URL_API}/usuario/${id}/${idAdmin}`)

}


}
