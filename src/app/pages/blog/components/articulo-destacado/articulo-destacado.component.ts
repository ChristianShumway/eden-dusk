import { Component, input } from '@angular/core';
import { ArticleModel } from '../../../../core/models/article-blog.model';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';

@Component({
  selector: 'blog-articulo-destacado',
  standalone: true,
  imports: [
    BackgroundImagePipe
  ],
  templateUrl: './articulo-destacado.component.html',
  styleUrl: './articulo-destacado.component.scss'
})
export class ArticuloDestacadoComponent {

  public article = input.required<ArticleModel>();

}
