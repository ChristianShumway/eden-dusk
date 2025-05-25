import { Component, inject, input, signal } from '@angular/core';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ImageGalleryModel } from '../../../../core/models/filters-gallery.model';
import { CommonModule } from '@angular/common';
import { ItemColeccionComponent } from '../item-coleccion/item-coleccion.component';
import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';

@Component({
  selector: 'gallery-coleccion',
  standalone: true,
  imports: [
    CommonModule,
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

  public msg = 'No hay galerías disponibles para esta categoría.'

}
