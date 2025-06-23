import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SafeHtml } from '@angular/platform-browser';

import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ImageGalleryModel } from '../../../../core/models/filters-gallery.model';
import { ItemColeccionComponent } from '../item-coleccion/item-coleccion.component';
import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';

@Component({
  selector: 'gallery-coleccion',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    ItemColeccionComponent,
    NoDataComponent
  ],
  templateUrl: './coleccion.component.html',
  styleUrl: './coleccion.component.scss'
})
export class ColeccionComponent {

  private readonly svgService = inject(SvgService);

  public galleryGroups = input.required<ImageGalleryModel[][]>();
  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public galleriesPerPage = input.required<number>();
  public currencyPage = input.required<number>();
  public totalGalleries = input.required<number>();
  public msg = 'No hay galerías disponibles para esta categoría.'

}
