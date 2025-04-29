import { Component, inject, OnInit, signal } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { FeedArticulosComponent } from '../../components/feed-articulos/feed-articulos.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { BlogService } from '../../../../core/services/blog.service';
import { CategoryArticleModel } from '../../../../core/models/article-blog.model';

@Component({
  selector: 'app-main-blog',
  standalone: true,
  imports: [
    LayoutComponent,
    FiltrosComponent,
    FeedArticulosComponent,
    SideBarComponent
  ],
  templateUrl: './main-blog.component.html',
  styleUrl: './main-blog.component.scss'
})
export class MainBlogComponent implements OnInit {

  private readonly blogService = inject(BlogService);

  public categoriesList = signal<CategoryArticleModel[]>([]);

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.blogService.getCategories().subscribe({
      next: response => this.categoriesList.set(response)
    });
  }

  onChangeCategory(category: CategoryArticleModel) {
    console.log(category)
  }

}
