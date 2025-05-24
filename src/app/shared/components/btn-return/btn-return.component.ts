import { Component, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';

@Component({
  selector: 'shared-btn-return',
  standalone: true,
  imports: [],
  template: `
    <a
      (click)="goToBack()"
      class="inline-flex items-center gap-4 font-primary-medium cursor-pointer mb-6 hover:text-primary-300 transition-colors duration-300">
      <div class="w-5 h-5 rotate-180 flex" [innerHTML]="svgArrow()"></div>
      <span> Regresar </span>
    </a>
  `
})

export class BtnReturnComponent {

  private readonly svgService = inject(SvgService);
  private readonly location = inject(Location);

  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRight));

  goToBack() {
    this.location.back();
  }

}
