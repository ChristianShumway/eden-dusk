import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { FiltersProducts } from '../../../../core/models/products.model';

@Component({
  selector: 'products-limpiar-filtros',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './limpiar-filtros.component.html',
  styleUrl: './limpiar-filtros.component.scss'
})
export class LimpiarFiltrosComponent {

  private readonly svgService = inject(SvgService);

  public currencyFilters = input.required<FiltersProducts>();
  @Output() public valueFilter = new EventEmitter<string>();

  public svgClose = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.close));

  cleanFilter(categoryName: string) {
    this.valueFilter.emit(categoryName);
  }

}
