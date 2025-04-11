import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
@Component({
  selector: 'home-novedades',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.scss'
})
export class NovedadesComponent {

  private readonly svgService = inject(SvgService);

  svgArrow: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);

}
