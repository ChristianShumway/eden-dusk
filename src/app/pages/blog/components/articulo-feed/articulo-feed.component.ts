import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../../core/services/svg.service';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { ArticleModel } from '../../../../core/models/article-blog.model';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { Router } from '@angular/router';
import { DateMxPipe } from '../../../../shared/pipes/mx-date.pipe';
import { PathsEnum } from '../../../../core/utils/paths.enum';
import { RecentDatePipe } from '../../../../shared/pipes/recent-date.pipe';

@Component({
  selector: 'blog-articulo-feed',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundImagePipe,
    DateMxPipe,
    RecentDatePipe
  ],
  templateUrl: './articulo-feed.component.html',
  styleUrl: './articulo-feed.component.scss'
})

export class ArticuloFeedComponent {

  private readonly router = inject(Router);
  private readonly svgService = inject(SvgService);

  public article = input.required<ArticleModel>();
  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRight));

  goTo(id: number) {
    this.router.navigate(['/blog', id]);
  }

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = PathsEnum.IMAGE_USER_DEFAULT;
  }

}
