import { Component, inject, signal, AfterViewInit, input } from '@angular/core';
import { Router } from '@angular/router';
import { initDials, initTooltips } from 'flowbite';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../core/services/svg.service';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'shared-socialmedia',
  standalone: true,
  imports: [],
  templateUrl: './shared-socialmedia.component.html',
  styleUrl: './shared-socialmedia.component.scss'
})
export class SharedSocialmediaComponent implements AfterViewInit {

  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly svgService = inject(SvgService);

  public urlArticle = input.required<string>();
  public iconShared = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.shared));
  public iconInstagram = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.instagram));
  public iconFacebook = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.facebook));
  public iconX = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.twitter));
  public iconWhatsapp = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.whatsapp));
  public iconLinkedin = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.linkedin));

  ngAfterViewInit(): void {
    initDials();
    initTooltips();
    this.router.events.subscribe(() => {
      setTimeout(() => {
        initDials(); // vuelve a correrlo cuando cambia la ruta
        initTooltips();
      }, 100); // pequeño delay para que el DOM esté listo
    });
  }

  encode(value: string): string {
    return encodeURIComponent(value);
  }

  copyToClipboard(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      this.toastService.showInfo('Enlace copiado. Abre Instagram para compartir en tu historia.');
    });
  }

}
