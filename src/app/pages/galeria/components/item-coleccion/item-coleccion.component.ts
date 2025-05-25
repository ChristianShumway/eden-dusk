import { Component, inject, input, signal } from '@angular/core';
import { ImageGalleryModel } from '../../../../core/models/filters-gallery.model';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { Router } from '@angular/router';
import { ProtectImageDirective } from '../../../../core/directives/protect-images.directive';

@Component({
  selector: 'gallery-item-coleccion',
  standalone: true,
  imports: [
    ProtectImageDirective
  ],
  templateUrl: './item-coleccion.component.html',
})
export class ItemColeccionComponent {

  private readonly svgService = inject(SvgService);
  private readonly router = inject(Router);

  public itemGallery = input.required<ImageGalleryModel>();
  public svgLocation = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.mapLocation));

  goToDetail(id: number) {
    this.router.navigate(['/galeria', id]);
  }

}
