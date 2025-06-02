import { Component, ElementRef, inject, input, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloDestacadoComponent } from '../articulo-destacado/articulo-destacado.component';
import { SvgService } from '../../../../core/services/svg.service';
import { ArticleModel } from '../../../../core/models/article-blog.model';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';

@Component({
  selector: 'blog-feed-destacados',
  standalone: true,
  imports: [
    CommonModule,
    ArticuloDestacadoComponent,
    NoDataComponent
  ],
  templateUrl: './feed-destacados.component.html',
  styleUrl: './feed-destacados.component.scss'
})
export class FeedDestacadosComponent implements AfterViewInit {

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  public articles = input.required<ArticleModel[]>();
  public title = input.required<string>();
  public msg = 'No hay artículos por mostrar.';

  private readonly svgService = inject(SvgService);

  public svgAnle = this.svgService.getSanitizedSvg(SvgIcons.angleRight);
  public svgArrow = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);

  public isAtStart = true;
  public isAtEnd = false;
  public totalScroll: number = 300;


  ngAfterViewInit(): void {
    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      this.checkScrollPosition();
    });
    this.checkScrollPosition(); // Llamarlo al inicio
  }

  checkScrollPosition() {
    const container = this.scrollContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    this.isAtStart = scrollLeft <= 0;
    this.isAtEnd = scrollLeft >= maxScrollLeft - 1; // Pequeña tolerancia
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: this.totalScroll, behavior: 'smooth' });
  }

}
