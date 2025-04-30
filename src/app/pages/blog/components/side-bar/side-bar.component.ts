import { Component, input } from '@angular/core';
import { NewsletterSidebarComponent } from '../newsletter-sidebar/newsletter-sidebar.component';
import { FeedDestacadosComponent } from '../feed-destacados/feed-destacados.component';
import { ArticleModel } from '../../../../core/models/article-blog.model';
import { CommonModule } from '@angular/common';
import { AutoresComponent } from '../autores/autores.component';

@Component({
  selector: 'blog-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    NewsletterSidebarComponent,
    FeedDestacadosComponent,
    AutoresComponent
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  public articles = input.required<ArticleModel[]>();

}
