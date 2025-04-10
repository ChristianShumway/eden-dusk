import { Component, inject } from '@angular/core';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

@Component({
  selector: 'home-quien-es-eden-dusk',
  standalone: true,
  imports: [],
  templateUrl: './quien-es-eden-dusk.component.html',
  styleUrl: './quien-es-eden-dusk.component.scss'
})
export class QuienEsEdenDuskComponent {

  private readonly svgService = inject(SvgService);

  svgSemiColons: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.semicolons);
  svgArrow: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);


}
