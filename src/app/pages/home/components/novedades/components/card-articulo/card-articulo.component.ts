import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { ArticleModel } from '../../../../../../core/models/article-blog.model';
import { SvgService } from '../../../../../../core/services/svg.service';
import { SvgIcons } from '../../../../../../core/utils/svg-icons.enum';
import { CommonModule } from '@angular/common';
import { RecentDatePipe } from '../../../../../../shared/pipes/recent-date.pipe';
import { BackgroundImagePipe } from '../../../../../../shared/pipes/backgound-images.pipe';
import { DateMxPipe } from '../../../../../../shared/pipes/mx-date.pipe';

@Component({
  selector: 'novedades-card-articulo',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundImagePipe,
    RecentDatePipe,
    DateMxPipe
  ],
  templateUrl: './card-articulo.component.html',
  styleUrl: './card-articulo.component.scss'
})
export class CardArticuloComponent {

  private readonly router = inject(Router);
  private readonly svgService = inject(SvgService);

  public article = input.required<ArticleModel>()
  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRight));

  goTo(id: number) {
    this.router.navigate(['/blog', id]);
  }

}
