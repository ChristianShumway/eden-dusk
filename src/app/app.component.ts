import { FooterComponent } from './shared/components/footer/footer.component';
import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SafeHtml } from '@angular/platform-browser';

import { SvgService } from './core/services/svg.service';
import { SvgIcons } from './core/utils/svg-icons.enum';

import { HeaderComponent } from './shared/components/header/header.component';
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
export class AppComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly svgService = inject(SvgService);

  public svgArrowUp = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowUp));
  public mostrarScrollTop = false;

  ngOnInit(): void {
    window.scrollTo({ top: 0 });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
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
