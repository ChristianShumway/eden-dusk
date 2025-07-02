import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from '../../components/layout/layout.component';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { GridProductosComponent } from '../../components/grid-productos/grid-productos.component';

import { LicenseProductModel } from '../../../../core/models/products.model';
import { ProductsService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-main-products',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    FiltrosComponent,
    GridProductosComponent
  ],
  templateUrl: './main-products.component.html',
  styleUrl: './main-products.component.scss'
})
export class MainProductsComponent implements OnInit {

  private readonly  productService = inject(ProductsService);

  public licensesType = signal<LicenseProductModel[]>([]);

  ngOnInit(): void {
    this.getLicensesType();
  }

  getLicensesType() {
    this.productService.getLicensesType().subscribe({
      next: response => this.licensesType.set(response)
    })
  }

}
