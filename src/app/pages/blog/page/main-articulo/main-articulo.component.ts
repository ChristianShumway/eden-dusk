import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

import { BlogService } from '../../../../core/services/blog.service';
import { SvgService } from '../../../../core/services/svg.service';
import { FeedDestacadosComponent } from '../../components/feed-destacados/feed-destacados.component';
import { AgregarComentarioComponent } from '../../components/agregar-comentario/agregar-comentario.component';
import { ComentariosComponent } from '../../components/comentarios/comentarios.component';
import { SharedSocialmediaComponent } from '../../../../shared/components/shared-socialmedia/shared-socialmedia.component';
import { BtnReturnComponent } from '../../../../shared/components/btn-return/btn-return.component';
import { ArticleModel, CategoryArticleModel, FiltersArticle } from '../../../../core/models/article-blog.model';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { DateMxPipe } from '../../../../shared/pipes/mx-date.pipe';

@Component({
  selector: 'app-main-articulo',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FeedDestacadosComponent,
    AgregarComentarioComponent,
    ComentariosComponent,
    SharedSocialmediaComponent,
    BtnReturnComponent,
    BackgroundImagePipe,
    DateMxPipe
  ],
  templateUrl: './main-articulo.component.html',
  styleUrl: './main-articulo.component.scss'
})
export class MainArticuloComponent implements OnInit {

  private readonly blogService = inject(BlogService);
  private readonly ar = inject(ActivatedRoute);
  private readonly svgService = inject(SvgService);
  private readonly location = inject(Location);
  private readonly cdr = inject(ChangeDetectorRef);

  public article = signal<ArticleModel>({
    id: 0,
    title: '',
    description: '',
    date: '', // Formato: '"2025-05-14"
    category: 'Todas',
    imageUrl: '',
    imageUrlThumbnail: '',
    imageUrlMedium: '',
    color: '',
    authorImage: '',
    authorName: '',
    smallDescription: '',
  });
  public categoriesList = signal<CategoryArticleModel[]>([]);
  public highLights = signal<ArticleModel[]>([]);
  public titleFeed : string = 'Artículos recomendados';
  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public svgComment = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.msgDialog));

  public selectedTab: 'leer' | 'agregar' = 'leer';
  public descriptionHtml = signal<SafeHtml>('');
  public filters = signal<FiltersArticle>({
    page: 1,
    per_page: 5,
    category: '',
    search: ''
  });

  public commentsMap = {
    '=1': 'comentario',
    'other': 'comentarios',
  };

  ngOnInit(): void {
    this.getCategories();
    this.initParams();
  }

  getCategories() {
    this.blogService.getCategories().subscribe({
      next: response => {
        if(!response) return;
        this.categoriesList.set(response);
        this.cdr.detectChanges(); // <- Solución
      },
      error: err => console.error(err)
    });
  }

  initParams() {
    this.ar.paramMap.pipe(
      switchMap( (params: ParamMap) => {
        return this.blogService.getArticleById(Number(params.get('id')));
      })
    ).subscribe({
      next: response => {
        if(!response) return;
        console.log(response)
        this.article.set(response);
        this.descriptionHtml.set(this.svgService.getTrueHtml(this.article().description));
        this.updateFilters();
      }
    })
  }

  updateFilters() {
    const currencyCategory = this.categoriesList().find(category => category.label === this.article().category);
    if(!currencyCategory)return;

    this.filters.update(currencyValue => {
      return {
        ...currencyValue,
        category: currencyCategory.id
      }
    });
    this.getRecommendedArticles();
  }

  getRecommendedArticles() {
    this.blogService.getRecommendedArticles(this.filters()).subscribe({
      next: response => {
        this.highLights.set(response);
        console.log(response)
      },
      error: err => console.error(err)
    });
  }

  selectTab(tab: 'leer' | 'agregar') {
    this.selectedTab = tab;
  }

  get currentUrl(): string {
    return window.location.origin + this.location.path();
  }


}
