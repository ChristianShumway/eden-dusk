import { inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
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

  getTrueHtml(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text)
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
