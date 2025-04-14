import { Component, input } from '@angular/core';
import { TransmisionModel } from '../../../../core/models/transmission.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'transmisiones-eventos-proximos',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './eventos-proximos.component.html',
  styleUrl: './eventos-proximos.component.scss'
})
export class EventosProximosComponent {

  public eventos = input.required<TransmisionModel[]>();


}
