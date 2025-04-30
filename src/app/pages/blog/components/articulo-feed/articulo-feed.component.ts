import { Component, input } from '@angular/core';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { ArticleModel } from '../../../../core/models/article-blog.model';
import { CommonModule } from '@angular/common';

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

  public article = input.required<ArticleModel>();

}
