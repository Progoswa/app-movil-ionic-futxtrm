import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { GuardService } from './guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUsuarioService {
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
          if(resp.ok){
            if(resp.data.role == 'usuario'){
              this.socket.emit('registerID',{id:localStorage.getItem('id')})
              return true
            }else{
              return false
            }
           
          }else{
            localStorage.clear()
            this.router.navigate(['/']);
            return false
          }
          
        })
      )
  }
  
  
}
