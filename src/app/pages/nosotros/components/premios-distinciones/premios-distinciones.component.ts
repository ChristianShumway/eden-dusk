import { Component, inject } from '@angular/core';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

@Component({
  selector: 'nosotros-premios-distinciones',
  standalone: true,
  imports: [],
  templateUrl: './premios-distinciones.component.html',
  styleUrl: './premios-distinciones.component.scss'
})
export class PremiosDistincionesComponent {

  private readonly svgService = inject(SvgService);

  public svgArrow = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);
  public svgAngle = this.svgService.getSanitizedSvg(SvgIcons.angleRight);
  public svgCalendar = this.svgService.getSanitizedSvg(SvgIcons.calendar);

}
