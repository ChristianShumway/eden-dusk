import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { TimeLineHistoryModel } from '../../../../core/models/timeline-history.model';

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

  public svgArrow = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);
  public dataDummy:TimeLineHistoryModel[] = [
    {
      id: 1,
      title: '2014',
      description: 'Fotografía nocturna en Parque Sinaloa, génesis del proyecto.',
      icon: 'camera',
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg'
    },
    {
      id: 2,
      title: '2017',
      description: 'Apertura a nuevos géneros (retratos, paisajes urbanos).',
      icon: 'camera',
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg'
    },
    {
      id: 3,
      title: '2019',
      description: 'Primeras colaboraciones con instituciones y medios, servicios comerciales.',
      icon: 'camera',
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg'
    },
    {
      id: 4,
      title: '2020-2022',
      description: 'Documentales, cortometrajes, talleres, reconocimientos estatales y nacionales.',
      icon: 'camera',
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg'
    },
    {
      id: 5,
      title: '2023',
      description: 'Consolidación en transmisiones en vivo, conexiones con comunidades yoreme, premiaciones, expansión del área audiovisual.',
      icon: 'camera',
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg'
    },
    {
      id: 6,
      title: '2017',
      description: 'Apertura a nuevos géneros (retratos, paisajes urbanos).',
      icon: 'camera',
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg'
    },
    {
      id: 7,
      title: '2019',
      description: 'Primeras colaboraciones con instituciones y medios, servicios comerciales.',
      icon: 'camera',
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg'
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
