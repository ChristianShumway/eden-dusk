import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, inject, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { Swiper } from 'swiper/types';
import { PathsEnum } from '../../../../core/utils/paths.enum';

@Component({
  selector: 'home-preview-store',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundImagePipe
  ],
  templateUrl: './preview-store.component.html',
  styleUrl: './preview-store.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PreviewStoreComponent {

  private readonly svgService = inject(SvgService);

  svgArrow: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.angleRight);
  svgStar: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.star);
  slidesPerView = 3;
  screenWidth: number = 0;

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  swiper!: Swiper;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    this.updateSlidesScreenSize();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSlidesScreenSize();
  }

  private updateSlidesScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
      if(this.screenWidth <= 768) {
        this.slidesPerView = 1;
      } else if( this.screenWidth > 768 && this.screenWidth <= 1024) {
        this.slidesPerView = 3;
      } else {
        this.slidesPerView = 4;
      }
    }
  }

  productos = [
    {
      name: 'Producto 1',
      description: 'Descripción del producto 1',
      price: 1000,
      image: `${PathsEnum.URLIMAGES}/_ELA6081-min.jpg`
    },
    {
      name: 'Producto 2',
      description: 'Descripción del producto 2',
      price: 230,
      image: `${PathsEnum.URLIMAGES}/_NEL3160-min.jpg`
    },
    {
      name: 'Producto 3',
      description: 'Descripción del producto 3',
      price: 340,
      image: `${PathsEnum.URLIMAGES}/_NEL2618-min.jpg`
    },
    {
      name: 'Producto 4',
      description: 'Descripción del producto 4',
      price: 432,
      image: `${PathsEnum.URLIMAGES}/_NEL2532-min.jpg`
    },
    {
      name: 'Producto 5',
      description: 'Descripción del producto 5',
      price: 987,
      image: `${PathsEnum.URLIMAGES}/_NEL3160-min.jpg`
    },
    {
      name: 'Producto 6',
      description: 'Descripción del producto 6',
      price: 234,
      image: `${PathsEnum.URLIMAGES}/_NEL2532-min.jpg`
    },
  ];

  ngOnDestroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
  }

}
