import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';

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

  slidesPerView = 3;
  screenWidth: number = 0;

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
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg'
    },
    {
      name: 'Producto 2',
      description: 'Descripción del producto 2',
      price: 230,
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      name: 'Producto 3',
      description: 'Descripción del producto 3',
      price: 340,
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg'
    },
    {
      name: 'Producto 4',
      description: 'Descripción del producto 4',
      price: 432,
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg'
    },
    {
      name: 'Producto 5',
      description: 'Descripción del producto 5',
      price: 987,
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg'
    },
    {
      name: 'Producto 6',
      description: 'Descripción del producto 6',
      price: 234,
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg'
    },
  ];

}
