import { Component, HostListener, inject, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SafeHtml } from '@angular/platform-browser';

import { SvgService } from './core/services/svg.service';
import { SvgIcons } from './core/utils/svg-icons.enum';

import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  private readonly router = inject(Router);
  private readonly svgService = inject(SvgService);

  public svgArrowUp = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public mostrarScrollTop = false;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ){
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0 });

      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.mostrarScrollTop = window.scrollY > 500;
  }

  scrollArriba(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
