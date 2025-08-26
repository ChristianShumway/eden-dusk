import { Component, inject, input } from '@angular/core';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { TrayectoriaDataModel } from '../../../../core/models/trayectoria.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nosotros-premios-distinciones',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './premios-distinciones.component.html',
  styleUrl: './premios-distinciones.component.scss'
})
export class PremiosDistincionesComponent {

  private readonly svgService = inject(SvgService);

  public data = input.required<TrayectoriaDataModel | null>();

  public svgArrow = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);
  public svgAngle = this.svgService.getSanitizedSvg(SvgIcons.angleRight);
  public svgCalendar = this.svgService.getSanitizedSvg(SvgIcons.calendar);

}
