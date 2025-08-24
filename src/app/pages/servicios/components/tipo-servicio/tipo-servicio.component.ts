import { Component, input } from '@angular/core';
import { TipoServicio } from '../../../../core/models/servicios-profesionales.model';

@Component({
  selector: 'servicios-tipo-servicio',
  standalone: true,
  imports: [],
  templateUrl: './tipo-servicio.component.html',
  styleUrl: './tipo-servicio.component.scss'
})
export class TipoServicioComponent {

  public data = input.required<TipoServicio | undefined>();

}
