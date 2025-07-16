import { Component, ElementRef, inject, signal, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathsEnum } from '../../../../core/utils/paths.enum';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

@Component({
  selector: 'productos-slide-images-product',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './slide-images-product.component.html',
  styleUrl: './slide-images-product.component.scss'
})
export class SlideImagesProductComponent implements AfterViewInit {

  private readonly svgService  = inject(SvgService);
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  public svgAnle = this.svgService.getSanitizedSvg(SvgIcons.angleRight);
  public svgArrow = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);
  public isAtStart = true;
  public isAtEnd = false;

  public dataDummy:any[] = [
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
    }
  ];

  currencyEvent = signal<any>(this.dataDummy[0]);

  ngAfterViewInit(): void {
    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      this.checkScrollPosition();
    });
    this.checkScrollPosition(); // Llamarlo al inicio
  }

  checkScrollPosition() {
    const container = this.scrollContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    this.isAtStart = scrollLeft <= 0;
    this.isAtEnd = scrollLeft >= maxScrollLeft - 1; // Pequeña tolerancia
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -100, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 100, behavior: 'smooth' });
  }

  selectItem(item: any) {
    this.currencyEvent.set(item);
  }

}
