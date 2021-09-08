import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'ejercicio'
})
export class EjercicioPipe implements PipeTransform {
  constructor(
    private translate:TranslateService
  ){

  }



  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 1:
        return this.translate.instant("types.strength")
        break;
      case 2:
        return this.translate.instant("types.speed")
        break;
      case 3:
        return this.translate.instant("types.resistance")
        break;
      case 4:
        return this.translate.instant("types.coordination")
        break;
      case 5:
        return this.translate.instant("types.coordinating_capacity")
        break;
    
      default:
        return this.translate.instant("types.no_type")
        break;
    }
   
  }

}
