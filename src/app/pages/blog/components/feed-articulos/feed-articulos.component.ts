import { Component, inject, input, signal } from '@angular/core';
import { ArticuloFeedComponent } from '../articulo-feed/articulo-feed.component';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ArticleModel } from '../../../../core/models/article-blog.model';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'blog-feed-articulos',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    ArticuloFeedComponent,
    NoDataComponent
  ],
  templateUrl: './feed-articulos.component.html',
  styleUrl: './feed-articulos.component.scss'
})
export class FeedArticulosComponent {

  private readonly svgService = inject(SvgService);

  public articles = input.required<ArticleModel[]>();
  public articlesPerPage = input.required<number>();
  public currencyPage = input.required<number>();
  public totalArticles = input.required<number>();

  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public msg = 'No hay artículos disponibles para esta categoría.'

}
