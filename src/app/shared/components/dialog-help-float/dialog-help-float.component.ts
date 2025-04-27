import { AfterViewInit, Component, inject, input, signal } from '@angular/core';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';
import { initPopovers } from 'flowbite';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-dialog-help-float',
  standalone: true,
  imports: [],
  templateUrl: './dialog-help-float.component.html',
  styleUrl: './dialog-help-float.component.scss'
})
export class DialogHelpFloatComponent implements AfterViewInit {

  private readonly router = inject(Router);
  private readonly svgService = inject(SvgService);


  public titleMsg = input.required<string>();
  public descriptionMsg = input.required<string>();
  public svgHelp = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.userHelp))


  ngAfterViewInit(): void {
    initPopovers();
    this.router.events.subscribe(() => {
      setTimeout(() => {
        initPopovers(); // vuelve a correrlo cuando cambia la ruta
      }, 100); // pequeño delay para que el DOM esté listo
    });
  }

}
