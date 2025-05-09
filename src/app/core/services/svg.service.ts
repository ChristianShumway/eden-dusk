import { inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../utils/svg-icons.enum';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

  private readonly sanitizer = inject(DomSanitizer);

  getSanitizedSvg(icon: SvgIcons): SafeHtml {
    const rawSvg = icon;
    return this.sanitizer.bypassSecurityTrustHtml(rawSvg);
  }

  getTrueHtml(text: string): SafeHtml | undefined {
    if(!text) return this.sanitizer.bypassSecurityTrustHtml('');
    return this.sanitizer.bypassSecurityTrustHtml(text)
  }

}
