import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { TransmisionModel } from '../../../../core/models/transmission.model';
import { NoEventosComponent } from '../../../../shared/components/no-eventos/no-eventos.component';
import { RouterModule } from '@angular/router';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

@Component({
  selector: 'home-eventos-transmisiones',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NoEventosComponent
  ],
  templateUrl: './eventos-transmisiones.component.html',
  styleUrl: './eventos-transmisiones.component.scss'
})
export class EventosTransmisionesComponent {

  private readonly svgService = inject(SvgService);

  public proximoEventos = input.required<TransmisionModel[]>();
  public eventosPasados = input.required<TransmisionModel[]>();

  public svgCalendar = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.calendar));
  public svgCamera = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.camera));

}
