import { Component, inject } from '@angular/core';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { SvgService } from '../../../../core/services/svg.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'nosotros-proyeccion-agradecimientos',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './proyeccion-agradecimientos.component.html',
  styleUrl: './proyeccion-agradecimientos.component.scss'
})
export class ProyeccionAgradecimientosComponent {

  private readonly svgService = inject(SvgService);

  public svgArrow = this.svgService.getSanitizedSvg(SvgIcons.angleRight);

}
