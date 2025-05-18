import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { FiltersGallery } from '../../../../core/models/filters-gallery.model';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

@Component({
  selector: 'gallery-limpiar-filtros',
  standalone: true,
  imports: [],
  templateUrl: './limpiar-filtros.component.html',
  styleUrl: './limpiar-filtros.component.scss'
})
export class LimpiarFiltrosComponent {

  private readonly svgService = inject(SvgService);

  public currencyFilters = input.required<FiltersGallery>();
  @Output() public valueFilter = new EventEmitter<string>();

  public svgClose = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.close));

  cleanFilter(categoryName: string) {
    this.valueFilter.emit(categoryName);
  }

}
