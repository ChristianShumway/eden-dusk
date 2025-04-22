import { Component, EventEmitter, input, OnInit, Output, output } from '@angular/core';
import { TransmisionModel } from '../../../../core/models/transmission.model';
import { CommonModule } from '@angular/common';
import { DiaSemanaPipe } from '../../../../shared/pipes/dia-semana.pipe';
import { MesNombrePipe } from '../../../../shared/pipes/mes-anio.pipe';
import { TimezonesPipe } from '../../../../shared/pipes/zona-horaria.pipe';
@Component({
  selector: 'transmisiones-evento-prox',
  standalone: true,
  imports: [
    CommonModule,
    DiaSemanaPipe,
    MesNombrePipe,
    TimezonesPipe
  ],
  templateUrl: './evento-prox.component.html',
  styleUrl: './evento-prox.component.scss'
})
export class EventoProxComponent implements OnInit {

  public evento = input.required<TransmisionModel>();
  // public dataEvento = output<TransmisionModel>();
  @Output() dataEvento = new EventEmitter<TransmisionModel>();
  public fechaEvento: Date = new Date();

  ngOnInit(): void {
    const setDate = new Date(this.evento().date)
    this.fechaEvento = new Date(setDate.getFullYear(), setDate.getMonth(), setDate.getDate() +1);
  }

  viewInfoEvent(evento: TransmisionModel) {
    this.dataEvento.emit(evento);
  }

}
