import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { GuardService } from './guard.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionGuardService {

constructor(
  private router:Router,
  private socket:Socket,
  private guardService:GuardService
) { }
canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    return this.guardService.getUser(localStorage.getItem('id')).pipe(
      take(1),
      map((resp:any)=>{
        console.log(resp)
        if(resp.ok){
          if(resp.data.role == 'administrador'){
            // this.socket.emit('logAdmin')
            // this.socket.emit('registerID',{id:localStorage.getItem('id')})
            // this.router.navigate(['/admin'])
            return true
          }else if(resp.data.role == 'usuario'){
           
            this.socket.emit('registerID',{id:localStorage.getItem('id')})
            this.router.navigate(['/c/inicio'])
            return false
          }else {
            return false
          }
         
        }else{
          localStorage.clear()
          
          return true
        }
        
      })
    )
   
    
}

}
