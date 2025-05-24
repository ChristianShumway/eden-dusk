import { Component, inject, OnInit, signal } from '@angular/core';
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
import { ArticleModel } from '../../../../core/models/article-blog.model';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

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
    BackgroundImagePipe
  ],
  templateUrl: './main-articulo.component.html',
  styleUrl: './main-articulo.component.scss'
})
export class MainArticuloComponent implements OnInit {

  private readonly blogService = inject(BlogService);
  private readonly ar = inject(ActivatedRoute);
  private readonly svgService = inject(SvgService);
  private readonly location = inject(Location);

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
  public highLights = signal<ArticleModel[]>([]);
  public titleFeed : string = 'Artículos recomendados';
  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public selectedTab: 'leer' | 'agregar' = 'leer';
  public descriptionHtml = signal<SafeHtml>('');

  ngOnInit(): void {
    this.initParams();
    this.getHighlights();
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
        this.descriptionHtml.set(this.svgService.getTrueHtml(this.article().description))
      }
    })
  }

  getHighlights() {
    this.blogService.getHighlights().subscribe({
      next: response => {
        this.highLights.set(response);
      }
    })
  }

  selectTab(tab: 'leer' | 'agregar') {
    this.selectedTab = tab;
  }

  get currentUrl(): string {
    return window.location.origin + this.location.path();
  }


}
