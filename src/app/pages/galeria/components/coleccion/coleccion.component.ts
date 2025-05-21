import { Component, inject, signal } from '@angular/core';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'gallery-coleccion',
  standalone: true,
  imports: [],
  templateUrl: './coleccion.component.html',
  styleUrl: './coleccion.component.scss'
})
export class ColeccionComponent {

  private readonly svgService = inject(SvgService);
  private readonly router = inject(Router);

  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public svgLocation = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.mapLocation));

  goToDetail(id: number) {
    this.router.navigate(['/galeria', id]);
  }
}
