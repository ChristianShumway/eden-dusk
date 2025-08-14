import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, inject, Inject, input, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { Swiper } from 'swiper/types';
import { SvgService } from '../../../../core/services/svg.service';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ProductModel } from '../../../../core/models/products.model';

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
  private readonly router = inject(Router);

  public products = input.required<ProductModel[]>();
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

  goToStore() {
    this.router.navigate(['/tienda']);
  }

  goToProduct(id: number) {
    this.router.navigate(['/tienda', id]);
  }

  ngOnDestroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
  }

}
