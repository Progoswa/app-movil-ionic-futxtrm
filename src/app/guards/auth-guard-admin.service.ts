import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { GuardService } from './guard.service';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService {

constructor(
  private router:Router,
  private guardService:GuardService,
  private socket:Socket
) { }




canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) {
  
    return this.guardService.getUser(localStorage.getItem('id')).pipe(
      take(1),
      map((resp:any)=>{
        console.log(resp)
        if(resp.ok){
          if(resp.data.role == 'administrador'){
            this.socket.emit('logAdmin')
            this.socket.emit('registerID',{id:localStorage.getItem('id')})
            return true
          }else{
            return false
          }
         
        }else{
          localStorage.clear()
          this.router.navigate(['/ingresa']);
          return false
        }
        
      })
    )
}


}
