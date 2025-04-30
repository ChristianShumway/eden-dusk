import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { FeedArticulosComponent } from '../../components/feed-articulos/feed-articulos.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { BlogService } from '../../../../core/services/blog.service';
import { ArticleModel, CategoryArticleModel } from '../../../../core/models/article-blog.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-blog',
  standalone: true,
  imports: [
    CommonModule,
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
  private readonly cdr = inject(ChangeDetectorRef);


  public categoriesList = signal<CategoryArticleModel[]>([]);
  public articles = signal<ArticleModel[]>([]);
  public highLights = signal<ArticleModel[]>([]);


  ngOnInit(): void {
    this.getCategories();
    this.getAllArticles();
    this.getHighLights();
  }

  getCategories() {
    this.blogService.getCategories().subscribe({
      next: response => {
        this.categoriesList.set(response);
        this.cdr.detectChanges(); // <- Solución
      }
    });
  }

  getAllArticles() {
    this.blogService.getAllArticles().subscribe({
      next: response => this.articles.set(response)
    })
  }

  getHighLights() {
    this.blogService.getHighlights().subscribe({
      next: response => {
        this.highLights.set(response)}
    })
  }

  onChangeCategory(category: CategoryArticleModel) {
    console.log(category)
  }

}
