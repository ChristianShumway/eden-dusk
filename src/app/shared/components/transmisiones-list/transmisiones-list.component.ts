import { Component, inject, input, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';
import { ModalTransmisionComponent } from '../modal-transmision/modal-transmision.component';
import { SvgService } from '../../../core/services/svg.service';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';
import { TiempoEvento, TransmisionModel } from '../../../core/models/transmission.model';
import { BackgroundImagePipe } from '../../pipes/backgound-images.pipe';
import { DateMxPipe } from '../../pipes/mx-date.pipe';

@Component({
  selector: 'shared-transmisiones-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalTransmisionComponent,
    BackgroundImagePipe,
    DateMxPipe
  ],
  templateUrl: './transmisiones-list.component.html',
  styleUrl: './transmisiones-list.component.scss'
})
export class TransmisionesListComponent {

  private readonly svgService = inject(SvgService);

  @ViewChild('myModal') myModal!: ModalTransmisionComponent;


  public eventos = input.required<TransmisionModel[]>();
  public tiempoEvento = input.required<TiempoEvento>();
  public component = input<string>();
  public showImgLastEvent = input<boolean>(false);

  public svgCamera = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.camera));
  public svgCalendar = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.calendar));

  public eventSelected!: TransmisionModel;

  onViewInfoEvent(evento: TransmisionModel) {
    this.eventSelected = evento;
    this.myModal.openModal();
  }

}
