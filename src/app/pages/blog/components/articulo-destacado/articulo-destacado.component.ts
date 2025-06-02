import { Component, inject, input } from '@angular/core';
import { ArticleModel } from '../../../../core/models/article-blog.model';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { DateMxPipe } from '../../../../shared/pipes/mx-date.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-articulo-destacado',
  standalone: true,
  imports: [
    BackgroundImagePipe,
    DateMxPipe
  ],
  templateUrl: './articulo-destacado.component.html',
  styleUrl: './articulo-destacado.component.scss'
})
export class ArticuloDestacadoComponent {

  private readonly router = inject(Router);
  public article = input.required<ArticleModel>();

  goTo(id: number) {
    this.router.navigate(['/blog', id]);
  }

}
