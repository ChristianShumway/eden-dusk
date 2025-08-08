import { Component, ElementRef, inject, signal, ViewChild, AfterViewInit, input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ImageOverlayComponent } from '../../../../shared/components/image-overlay/image-overlay.component';

@Component({
  selector: 'productos-slide-images-product',
  standalone: true,
  imports: [
    CommonModule,
    ImageOverlayComponent
  ],
  templateUrl: './slide-images-product.component.html',
  styleUrl: './slide-images-product.component.scss'
})
export class SlideImagesProductComponent implements AfterViewInit {

  private readonly svgService  = inject(SvgService);
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  public images = input.required<string[]>();

  public svgAnle = this.svgService.getSanitizedSvg(SvgIcons.angleRight);
  public svgArrow = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);
  public isAtStart = true;
  public isAtEnd = false;

  readonly imgTempGallery = signal<string | null>(null);
  public currencyUrlImage = signal<string | null>(null);


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && this.images().length) {
      this.imgTempGallery.set(this.images()[0]);
    }
  }

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

  selectItem(item: string) {
    this.imgTempGallery.set(item);
  }

  onPreview(img: string | null) {
    this.currencyUrlImage.set(img);
  }

}
