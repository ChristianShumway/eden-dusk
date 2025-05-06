import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { BlogService } from '../../../../core/services/blog.service';
import { ArticleModel } from '../../../../core/models/article-blog.model';
import { FeedDestacadosComponent } from '../../components/feed-destacados/feed-destacados.component';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { SvgService } from '../../../../core/services/svg.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { AgregarComentarioComponent } from '../../components/agregar-comentario/agregar-comentario.component';
import { ComentariosComponent } from '../../components/comentarios/comentarios.component';
import { SharedSocialmediaComponent } from '../../../../shared/components/shared-socialmedia/shared-socialmedia.component';

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
    BackgroundImagePipe
  ],
  templateUrl: './main-articulo.component.html',
  styleUrl: './main-articulo.component.scss'
})
export class MainArticuloComponent implements OnInit {

  private readonly blogService = inject(BlogService);
  private readonly ar = inject(ActivatedRoute);
  private readonly svgService = inject(SvgService);
  private readonly sanitizer = inject(DomSanitizer)

  public article = signal<ArticleModel | undefined>(undefined);
  public highLights = signal<ArticleModel[]>([]);
  public titleFeed : string = 'Artículos recomendados';
  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public selectedTab: 'leer' | 'agregar' = 'leer';

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
        this.article.set(response);
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


}
