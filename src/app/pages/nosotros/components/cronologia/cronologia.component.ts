import { Component, inject, input } from '@angular/core';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { TimeLineHistoryModel } from '../../../../core/models/timeline-history.model';
import { CommonModule } from '@angular/common';
import { TrayectoriaDataModel } from '../../../../core/models/trayectoria.model';

@Component({
  selector: 'nosotros-cronologia',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cronologia.component.html',
  styleUrl: './cronologia.component.scss'
})
export class CronologiaComponent {

  private readonly svgService = inject(SvgService);

  public data = input.required<TrayectoriaDataModel | null>();

  svgSemiColons: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.semicolons);
  svgCalendar: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.calendar);
  svgArrow: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.angleRight)

  public dataDummy:TimeLineHistoryModel[] = [
    {
      id: 1,
      title: 'Libro: 10 años de arte y naturaleza en Sinaloa',
      description: 'Publicación digital que reúne, en orden cronológico, nuestro trabajo y procesos creativos de 2014 a 2024: astrofotografía, cultura, expediciones, premios, aprendizajes y el contexto que dio origen a Eden Dusk. Es la forma más completa de conocer nuestra historia.',
      period: '2014 - 2024',
      icon: 'camera',
      image: 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      title: 'Fase de Expansión y Legado',
      description: 'En nuestro undécimo año, nos enfocamos en solidificar nuestro legado. El proyecto central es este sitio web, concebido como un archivo vivo y recurso educativo. Estratégicamente, 2025 marca una evolución hacia el trabajo videográfico con un videoclip, el cortometraje de impacto social «Hijos del Mar» y la preproducción de nuestro proyecto más ambicioso: un largometraje documental sobre el Farallón de San Ignacio.',
      period: '2025',
      icon: 'camera',
      image: 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ]

}
