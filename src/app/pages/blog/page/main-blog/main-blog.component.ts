import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutComponent } from '../../components/layout/layout.component';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { FeedArticulosComponent } from '../../components/feed-articulos/feed-articulos.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { BlogService } from '../../../../core/services/blog.service';
import { ArticleModel, CategoryArticle, CategoryArticleModel, FiltersArticle } from '../../../../core/models/article-blog.model';
import { error } from 'console';
@Component({
  selector: 'app-main-blog',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
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

  pageSize: number = 10;
  total: number = 10;
  limit: number = 10;
  page: number = 1;
  // public category = signal<CategoryArticle>('Todas');
  // public searchInput = signal<string>('');

  filters: FiltersArticle = {
    limit: this.limit,
    page: this.page,
    category: 'Todas',
    search: ''
  }

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

  getAllArticles(page?: number) {
    this.filters.page = page ? page : this.page
    this.page = page ? page : this.page;
    this.blogService.getAllArticles(this.filters).subscribe({
      next: response => {
        console.log(response);
        this.articles.set(response);
      },
      error: err => console.error(err)
    })
  }

  pageChanged(e: any) {
    this.getAllArticles(e);
  }

  getHighLights() {
    this.blogService.getHighlights().subscribe({
      next: response => {
        this.highLights.set(response)}
    })
  }

  onFilterChanged(data: { search: string; category: CategoryArticle }) {
    this.page = 1;
    this.filters = {
      ...data,
      limit: this.limit,
      page: this.page
    }
    this.getAllArticles();
  }

}
