import { Component, inject, input, signal } from '@angular/core';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { PathsEnum } from '../../../../core/utils/paths.enum';
import { ImageGalleryModel } from '../../../../core/models/filters-gallery.model';
import { Router } from '@angular/router';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

@Component({
  selector: 'home-layout',
  standalone: true,
  imports: [
    BackgroundImagePipe
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})

export class LayoutComponent {

  private readonly router = inject(Router);
  private readonly svgService = inject(SvgService);

  public urlImageBackground: string = `${PathsEnum.URLIMAGES}/_NEL3001_-min.jpg`;
  public imagesList = input.required<ImageGalleryModel[]>();
  public iconUser =  signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.user));

  goToGallery() {
    this.router.navigate(['/galeria']);
  }

  goToDetail(item: ImageGalleryModel) {
    this.router.navigate(['/galeria', item.category, item.id]);
  }

}
