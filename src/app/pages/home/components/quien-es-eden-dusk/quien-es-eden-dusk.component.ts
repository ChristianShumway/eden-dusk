import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../../core/services/svg.service';
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
  private readonly router = inject(Router);

  svgSemiColons: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.semicolons);
  svgArrow: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);

  goToTrayectoria() {
    this.router.navigate(['/trayectoria']);
  }


}
