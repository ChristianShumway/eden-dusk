import { Component, inject, signal } from '@angular/core';
import { ArticuloFeedComponent } from '../articulo-feed/articulo-feed.component';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

@Component({
  selector: 'blog-feed-articulos',
  standalone: true,
  imports: [
    ArticuloFeedComponent
  ],
  templateUrl: './feed-articulos.component.html',
  styleUrl: './feed-articulos.component.scss'
})
export class FeedArticulosComponent {

  private readonly svgService = inject(SvgService);

  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));

}
