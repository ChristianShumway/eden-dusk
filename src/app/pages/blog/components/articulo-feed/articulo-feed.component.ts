import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../../core/services/svg.service';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { ArticleModel } from '../../../../core/models/article-blog.model';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

@Component({
  selector: 'blog-articulo-feed',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundImagePipe
  ],
  templateUrl: './articulo-feed.component.html',
  styleUrl: './articulo-feed.component.scss'
})
export class ArticuloFeedComponent {

  private readonly svgService = inject(SvgService);

  public article = input.required<ArticleModel>();
  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRight));


}
