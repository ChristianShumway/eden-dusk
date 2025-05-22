import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { TransmisionModel } from '../../../../core/models/transmission.model';
import { SvgService } from '../../../../core/services/svg.service';
import { CommonModule } from '@angular/common';
import { EventoPasadoComponent } from '../evento-pasado/evento-pasado.component';
import { TransmisionesListComponent } from '../../../../shared/components/transmisiones-list/transmisiones-list.component';
import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';

@Component({
  selector: 'transmisiones-eventos-pasados',
  standalone: true,
  imports: [
    CommonModule,
    EventoPasadoComponent,
    TransmisionesListComponent,
    NoDataComponent
  ],
  templateUrl: './eventos-pasados.component.html',
  styleUrl: './eventos-pasados.component.scss'
})
export class EventosPasadosComponent {

  @ViewChild('sectionLastEvents', { static: true }) sectionLastEvents!: ElementRef;


  private readonly svgService = inject(SvgService);
  public eventos = input.required<TransmisionModel[]>();
  public svgArrow: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.angleRight);
  public msg = 'No hay transmisiones disponibles por mostrar.';

  public scrollToMe(): void {
    this.sectionLastEvents.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
