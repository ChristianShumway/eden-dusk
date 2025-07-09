import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { RecentDatePipe } from '../../../../shared/pipes/recent-date.pipe';
import { SvgService } from '../../../../core/services/svg.service';
import { ProductModel } from '../../../../core/models/products.model';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ImageOverlayComponent } from '../../../../shared/components/image-overlay/image-overlay.component';

@Component({
  selector: 'card-producto',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundImagePipe,
    RecentDatePipe,
    ImageOverlayComponent
  ],
  templateUrl: './card-producto.component.html',
  styleUrl: './card-producto.component.scss'
})

export class CardProductoComponent {
  private readonly router = inject(Router);
  private readonly svgService = inject(SvgService);

  public product = input.required<ProductModel>();
  public currencyUrlImage = signal<string>('');


  public svgPreview = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.eye));
  public svgMore = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.bag));

  goTo(id: number) {
    this.router.navigate(['/productos', id]);
  }

  onPreview(img: string) {
    this.currencyUrlImage.set(img);
  }
}
