import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { TimeLineHistoryModel } from '../../../../core/models/timeline-history.model';
import { PathsEnum } from '../../../../core/utils/paths.enum';

@Component({
  selector: 'nosotros-galeria-cronologia',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './galeria-cronologia.component.html',
  styleUrl: './galeria-cronologia.component.scss'
})
export class GaleriaCronologiaComponent {

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  private readonly svgService = inject(SvgService);

  public svgAnle = this.svgService.getSanitizedSvg(SvgIcons.angleRight);
  public svgArrow = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);
  public dataDummy:TimeLineHistoryModel[] = [
    {
      id: 1,
      title: '2014',
      description: 'Fotografía nocturna en Parque Sinaloa, génesis del proyecto.',
      icon: 'camera',
      image: `${PathsEnum.URLIMAGES}/_ELA8362-min.jpg`
    },
    {
      id: 2,
      title: '2017',
      description: 'Apertura a nuevos géneros (retratos, paisajes urbanos).',
      icon: 'camera',
      image: `${PathsEnum.URLIMAGES}/_NEL2618-min.jpg`
    },
    {
      id: 3,
      title: '2019',
      description: 'Primeras colaboraciones con instituciones y medios, servicios comerciales.',
      icon: 'camera',
      image: `${PathsEnum.URLIMAGES}/_ELA6081-min.jpg`
    },
    {
      id: 4,
      title: '2020-2022',
      description: 'Documentales, cortometrajes, talleres, reconocimientos estatales y nacionales.',
      icon: 'camera',
      image: `${PathsEnum.URLIMAGES}/_NEL2404-min.jpg`
    },
    {
      id: 5,
      title: '2023',
      description: 'Consolidación en transmisiones en vivo, conexiones con comunidades yoreme, premiaciones, expansión del área audiovisual.',
      icon: 'camera',
      image: `${PathsEnum.URLIMAGES}/_NEL3001_-min.jpg`
    },
    {
      id: 6,
      title: '2017',
      description: 'Apertura a nuevos géneros (retratos, paisajes urbanos).',
      icon: 'camera',
      image: `${PathsEnum.URLIMAGES}/_NEL3202-min.jpg`
    },
    {
      id: 7,
      title: '2019',
      description: 'Primeras colaboraciones con instituciones y medios, servicios comerciales.',
      icon: 'camera',
      image: `${PathsEnum.URLIMAGES}/_NEL3160-min.jpg`
    },
  ];

  currencyEvent = signal<TimeLineHistoryModel>(this.dataDummy[0]);

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  selectItem(item: TimeLineHistoryModel) {
    this.currencyEvent.set(item);
  }

}
