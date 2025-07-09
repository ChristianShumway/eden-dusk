import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ProductModel } from '../../../../core/models/products.model';
import { CardProductoComponent } from '../card-producto/card-producto.component';

@Component({
  selector: 'products-grid-productos',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundImagePipe,
    NgxPaginationModule,
    NoDataComponent,
    CardProductoComponent
  ],
  templateUrl: './grid-productos.component.html',
  styleUrl: './grid-productos.component.scss'
})
export class GridProductosComponent {

  private readonly svgService = inject(SvgService);

  public products = input.required<ProductModel[]>();
  public productsPerPage = input.required<number>();
  public currencyPage = input.required<number>();
  public totalProducts = input.required<number>();

  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public msg = 'No hay productos disponibles para tu busqueda.'

}
