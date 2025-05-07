import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { Router, RouterModule } from '@angular/router';
import { BlogService } from '../../../../core/services/blog.service';
import { ArticleModel } from '../../../../core/models/article-blog.model';
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

  svgArrow: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.angleRight);
  public articlesList = signal<ArticleModel[]>([]);

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.blogService.getMainArticles().subscribe({
      next: response => this.articlesList.set(response)
    });
  }

  goTo(id: number) {
    this.router.navigate(['/blog', id]);
  }

}
