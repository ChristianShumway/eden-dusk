import { ChangeDetectorRef, Component, inject, input, OnInit, signal } from '@angular/core';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { SvgService } from '../../../../core/services/svg.service';
import { RouterModule } from '@angular/router';
import { FiltrosColaboracionesComponent } from '../filtros-colaboraciones/filtros-colaboraciones.component';
import { BlogService } from '../../../../core/services/blog.service';
import { CategoryArticleModel, FiltersArticle } from '../../../../core/models/article-blog.model';
import { TrayectoriaDataModel } from '../../../../core/models/trayectoria.model';

@Component({
  selector: 'nosotros-colaboraciones-alianzas',
  standalone: true,
  imports: [
    RouterModule,
    FiltrosColaboracionesComponent
  ],
  templateUrl: './colaboraciones-alianzas.component.html',
})

export class ColaboracionesAlianzasComponent implements OnInit {

  private readonly svgService = inject(SvgService);
  private readonly blogService = inject(BlogService);
  private readonly cdr = inject(ChangeDetectorRef);

  public data = input.required<TrayectoriaDataModel | null>();

  public svgArrow = this.svgService.getSanitizedSvg(SvgIcons.angleRight);

  public categoriesList = signal<CategoryArticleModel[]>([]);
  // public articles = signal<ArticleModel[]>([]);
  public page = signal<number>(1);
  public perPage = signal<number>(10);
  public totalColaboraciones = signal<number>(0);
  public filters = signal<FiltersArticle>({
    page: this.page(),
    per_page: this.perPage(),
    category: '',
    search: ''
  });

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.blogService.getCategories().subscribe({
      next: response => {
        this.categoriesList.set(response);
        this.cdr.detectChanges(); // <- Solución
      }
    });
  }

  onFilterChanged(data: { search: string; category: string }) {
    console.log(data);
    this.page.set(1);
    this.filters.update(currencyValue => {
      return {
        ...data,
        per_page: this.perPage(),
        page: this.page()
      }
    });
    // this.getAllArticles();
  }

}
