import { Component, inject, input } from '@angular/core';
import { TransmisionModel } from '../../../../core/models/transmission.model';
import { CommonModule } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { EventoProxComponent } from '../evento-prox/evento-prox.component';
import { MesNombrePipe } from '../../../../shared/pipes/mes-anio.pipe';

@Component({
  selector: 'transmisiones-eventos-proximos',
  standalone: true,
  imports: [
    CommonModule,
    EventoProxComponent,
    MesNombrePipe
  ],
  templateUrl: './eventos-proximos.component.html',
  styleUrl: './eventos-proximos.component.scss'
})
export class EventosProximosComponent {

  private readonly svgService = inject(SvgService);
  public eventos = input.required<TransmisionModel[]>();
  public dateEvents = input.required<Date>();
  public svgArrow: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);

  get numberMont() {
    const month = this.dateEvents().getMonth() + 1 ;
    return month < 10 ? `0${month}` : month;
  }


}
