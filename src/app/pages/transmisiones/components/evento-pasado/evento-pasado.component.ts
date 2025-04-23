import { Component, input } from '@angular/core';
import { TransmisionModel } from '../../../../core/models/transmission.model';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';

@Component({
  selector: 'transmisiones-evento-pasado',
  standalone: true,
  imports: [
    BackgroundImagePipe
  ],
  templateUrl: './evento-pasado.component.html',
  styleUrl: './evento-pasado.component.scss'
})
export class EventoPasadoComponent {

  public evento = input.required<TransmisionModel>();

}
