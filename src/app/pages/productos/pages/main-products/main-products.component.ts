import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from '../../components/layout/layout.component';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { GridProductosComponent } from '../../components/grid-productos/grid-productos.component';

import { FiltersProducts, LicenseProductModel, TypeProductModel } from '../../../../core/models/products.model';
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
  public catalogProductTypes = signal<TypeProductModel[]>([]);
  public catalogOrderProductType = signal<TypeProductModel[]>([]);


  public page = signal<number>(1);
  public perPage = signal<number>(12);
  public totalItems = signal<number>(0);
  public filters = signal<FiltersProducts>({
    page: this.page(),
    per_page: this.perPage(),
    search: '',
    license: { id:'', label:'' },
    type: { id:'', label:'' },
    order: ''
  });


  ngOnInit(): void {
    this.getLicensesType();
    this.getProductTypes();
    this.getOrderProductTypes();
  }

  getLicensesType() {
    this.productService.getLicensesType().subscribe({
      next: response => this.licensesType.set(response)
    })
  }

  getProductTypes() {
    this.productService.getProductTypes().subscribe({
      next: response => this.catalogProductTypes.set(response)
    })
  }

  getOrderProductTypes() {
    this.productService.getOrderProductType().subscribe({
      next: response => this.catalogOrderProductType.set(response)
    })
  }

  getProducts(page?: number) {
    this.filters.update( currencyValue => {
      return {
        ...currencyValue,
        page: page ? page : this.page()
      }
    });
    this.page.set(page ? page : this.page());
    console.log(this.filters());
  }

  onFilterChanged(data: FiltersProducts) {
    this.page.set(1);
    this.filters.update(() => {
      return {
        ...data,
        per_page: this.perPage(),
        page: this.page()
      }
    });
    this.getProducts();
  }

  pageChanged(e: number) {
    this.getProducts(e);
  }

}
