import { Component, EventEmitter, inject, input, Output, output, signal } from '@angular/core';
import { TransmisionModel } from '../../../../core/models/transmission.model';
import { CommonModule } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { EventoProxComponent } from '../evento-prox/evento-prox.component';
import { MesNombrePipe } from '../../../../shared/pipes/mes-anio.pipe';
import { AlertRemovableComponent } from '../../../../shared/components/alert-removable/alert-removable.component';
import { TypeMessage } from '../../../../core/models/type-message.model';
import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';

@Component({
  selector: 'transmisiones-eventos-proximos',
  standalone: true,
  imports: [
    CommonModule,
    EventoProxComponent,
    AlertRemovableComponent,
    NoDataComponent,
    MesNombrePipe
  ],
  templateUrl: './eventos-proximos.component.html',
  styleUrl: './eventos-proximos.component.scss'
})

export class EventosProximosComponent {

  private readonly svgService = inject(SvgService);

  public eventos = input.required<TransmisionModel[]>();
  public dateEvents = input.required<Date>();
  public scrollDown = output();
  @Output() dataEvento = new EventEmitter<TransmisionModel>();

  public svgArrow: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);
  public svgCamara = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.camera));
  public msg: string = 'Para poder ver los eventos de otro mes, selecciona la fecha en el calendario de arriba.';
  public typeMessage: TypeMessage = 'info';
  public msgSearch = 'No hay datos disponibles para el período seleccionado.';


  get numberMont() {
    const month = this.dateEvents().getMonth() + 1 ;
    return month < 10 ? `0${month}` : month;
  }

  onViewInfoEvent(evento: TransmisionModel) {
    this.dataEvento.emit(evento);
  }

}
