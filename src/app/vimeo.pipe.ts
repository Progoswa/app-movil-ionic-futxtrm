import { Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'vimeo',
  pure: true
})
export class VimeoPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}
  transform(value: unknown, ...args: unknown[]): SafeResourceUrl {
    console.log('vimeo pipe');
    
    return  this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${value}?autoplay=0&color=d0ae3d&byline=0&portrait=0`);
  }

}
