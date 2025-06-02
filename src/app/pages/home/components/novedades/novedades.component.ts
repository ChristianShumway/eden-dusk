import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { Router, RouterModule } from '@angular/router';
import { BlogService } from '../../../../core/services/blog.service';
import { ArticleModel, FiltersArticle } from '../../../../core/models/article-blog.model';
import { PathsEnum } from '../../../../core/utils/paths.enum';
@Component({
  selector: 'home-novedades',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.scss'
})
export class NovedadesComponent implements OnInit {

  private readonly svgService = inject(SvgService);
  private readonly router = inject(Router);
  private readonly blogService = inject(BlogService);

  public svgArrow: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.angleRight);
  public articlesList = signal<ArticleModel[]>([]);

  public filters = signal<FiltersArticle>({
    page: 1,
    per_page: 4,
    category: '',
    search: ''
  });

  ngOnInit(): void {
    this.getAllArticles();
  }

  getAllArticles() {
    this.blogService.getAllArticles(this.filters()).subscribe({
      next: response => {
        this.articlesList.set(response.data);
      },
      error: err => console.error(err)
    })
  }

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = PathsEnum.IMAGE_DEFAULT;
  }

  goTo(id: number) {
    this.router.navigate(['/blog', id]);
  }

}
