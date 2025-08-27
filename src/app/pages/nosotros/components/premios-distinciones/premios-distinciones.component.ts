import { Component, inject, input } from '@angular/core';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { TrayectoriaDataModel } from '../../../../core/models/trayectoria.model';
import { CommonModule } from '@angular/common';
import { CoberturaMediosModel } from '../../../../core/models/cobertura-medios.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { DateMxPipe } from '../../../../shared/pipes/mx-date.pipe';

@Component({
  selector: 'nosotros-premios-distinciones',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    DateMxPipe
  ],
  templateUrl: './premios-distinciones.component.html',
  styleUrl: './premios-distinciones.component.scss'
})
export class PremiosDistincionesComponent {

  private readonly svgService = inject(SvgService);

  public data = input.required<TrayectoriaDataModel | null>();
  public coberturas = input.required<CoberturaMediosModel[]>();
  public itemsPerPage = input.required<number>();
  public currencyPage = input.required<number>();
  public totalCoberturas = input.required<number>();

  public svgArrow = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);
  public svgAngle = this.svgService.getSanitizedSvg(SvgIcons.angleRight);
  public svgCalendar = this.svgService.getSanitizedSvg(SvgIcons.calendar);

  goToUrl(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

}
