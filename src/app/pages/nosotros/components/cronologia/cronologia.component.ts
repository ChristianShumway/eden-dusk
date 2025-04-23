import { Component, inject } from '@angular/core';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { TimeLineHistoryModel } from '../../../../core/models/timeline-history.model';
import { CommonModule } from '@angular/common';

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

  svgSemiColons: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.semicolons);
  svgArrow: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.arrowRight)

  public dataDummy:TimeLineHistoryModel[] = [
    {
      id: 1,
      title: '2014',
      description: 'Fotografía nocturna en Parque Sinaloa, génesis del proyecto.',
      icon: 'camera',
      image: 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      title: '2017',
      description: 'Apertura a nuevos géneros (retratos, paisajes urbanos).',
      icon: 'camera',
      image: 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      title: '2019',
      description: 'Primeras colaboraciones con instituciones y medios, servicios comerciales.',
      icon: 'camera',
      image: 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      title: '2020-2022',
      description: 'Documentales, cortometrajes, talleres, reconocimientos estatales y nacionales.',
      icon: 'camera',
      image: 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 5,
      title: '2023',
      description: 'Consolidación en transmisiones en vivo, conexiones con comunidades yoreme, premiaciones, expansión del área audiovisual.',
      icon: 'camera',
      image: 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ]

}
