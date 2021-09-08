import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-elegir',
  templateUrl: './elegir.page.html',
  styleUrls: ['./elegir.page.scss'],
})
export class ElegirPage implements OnInit {
  categoria: any;

  constructor(
    private route:ActivatedRoute,
    private router:Router
  ) {

      this.categoria = router.getCurrentNavigation().extras.state.categoria
      
   }

  ngOnInit() {
    console.log(this.categoria);
    
  }

  predeterminada(){
  
   this.router.navigate(["/predeterminada"],{state:{categoria:this.categoria},preserveFragment:false,replaceUrl:true})
    
  }
  personalizada(){
  
    this.router.navigate(["/personalizada"],{state:{categoria:this.categoria},preserveFragment:false,replaceUrl:true})
    
  }



}
