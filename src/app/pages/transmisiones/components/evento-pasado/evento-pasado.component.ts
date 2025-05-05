import { Component, inject, input, signal } from '@angular/core';
import { TransmisionModel } from '../../../../core/models/transmission.model';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

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

  private readonly svgService = inject(SvgService);
  public evento = input.required<TransmisionModel>();
  public svgIcon = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRight));

}
