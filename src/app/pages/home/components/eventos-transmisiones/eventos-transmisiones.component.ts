import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';
import { TransmisionesListComponent } from '../../../../shared/components/transmisiones-list/transmisiones-list.component';
import { TransmisionModel } from '../../../../core/models/transmission.model';

@Component({
  selector: 'home-eventos-transmisiones',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NoDataComponent,
    TransmisionesListComponent
  ],
  templateUrl: './eventos-transmisiones.component.html',
  styleUrl: './eventos-transmisiones.component.scss'
})

export class EventosTransmisionesComponent {

  public proximoEventos = input.required<TransmisionModel[]>();
  public eventosPasados = input.required<TransmisionModel[]>();

  public msg = 'No hay transmisiones disponibles por mostrar.';

}
