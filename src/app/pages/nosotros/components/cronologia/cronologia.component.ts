import { Component, inject, input } from '@angular/core';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { CommonModule } from '@angular/common';
import { TrayectoriaDataModel } from '../../../../core/models/trayectoria.model';
@Component({
  selector: 'nosotros-cronologia',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cronologia.component.html',
  styleUrl: './cronologia.component.scss'
})
export class CronologiaComponent {

  private readonly svgService = inject(SvgService);

  public data = input.required<TrayectoriaDataModel | null>();

  svgSemiColons: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.semicolons);
  svgCalendar: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.calendar);
  svgArrow: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.angleRight)


}
