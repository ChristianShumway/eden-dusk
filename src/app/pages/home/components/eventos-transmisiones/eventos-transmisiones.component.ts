import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'home-eventos-transmisiones',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './eventos-transmisiones.component.html',
  styleUrl: './eventos-transmisiones.component.scss'
})
export class EventosTransmisionesComponent {

  fechaHoy = new Date;

}
