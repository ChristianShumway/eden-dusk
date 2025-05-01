import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { BlogService } from '../../../../core/services/blog.service';
import { ArticleModel } from '../../../../core/models/article-blog.model';

@Component({
  selector: 'app-main-articulo',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './main-articulo.component.html',
  styleUrl: './main-articulo.component.scss'
})
export class MainArticuloComponent implements OnInit {

  private readonly blogService = inject(BlogService);
  private readonly ar = inject(ActivatedRoute);

  public article = signal<ArticleModel | undefined>(undefined);

  ngOnInit(): void {
    this.initParams();
  }

  initParams() {
    this.ar.paramMap.pipe(
      switchMap( (params: ParamMap) => {
        return this.blogService.getArticleById(Number(params.get('id')));
      })
    ).subscribe({
      next: response => {
        this.article.set(response);
      }
    })
  }


}
