import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { map, take } from 'rxjs/operators';
import { GuardService } from './guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

constructor(
  private router:Router,
  private guardService:GuardService
) { 


}



canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) {
  
    return this.guardService.getUser(localStorage.getItem('id')).pipe(
      take(1),
      map((resp:any)=>{
        if(resp.ok){
          return true
        }else{
          localStorage.clear()
          this.router.navigate(['']);
          return false
        }
        
      })
    )
}


}
