import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { PathsEnum } from '../../core/utils/paths.enum';

@Pipe({
  name: 'backgroundImage',
  standalone: true,
})
export class BackgroundImagePipe implements PipeTransform {

  constructor(
    private readonly sanitizer: DomSanitizer
  ) {}

  transform(value: string | undefined): SafeStyle {
    if(!value) return this.sanitizer.bypassSecurityTrustStyle(`url(${PathsEnum.IMAGE_DEFAULT})`);
    return this.sanitizer.bypassSecurityTrustStyle(`url(${value})`);
  }

}
