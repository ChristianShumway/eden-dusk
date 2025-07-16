import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnReturnComponent } from '../../../../shared/components/btn-return/btn-return.component';
import { SlideImagesProductComponent } from '../../components/slide-images-product/slide-images-product.component';
import { ActionsProductComponent } from '../../components/actions-product/actions-product.component';
import { ProductsService } from '../../../../core/services/products.service';
import { MaterialProductModel, SizeProductModel } from '../../../../core/models/products.model';
import { InfoProductComponent } from '../../components/info-product/info-product.component';
@Component({
  selector: 'app-main-product',
  standalone: true,
  imports: [
    CommonModule,
    BtnReturnComponent,
    SlideImagesProductComponent,
    ActionsProductComponent,
    InfoProductComponent
  ],
  templateUrl: './main-product.component.html',
  styleUrl: './main-product.component.scss'
})
export class MainProductComponent implements OnInit {

  private readonly productService = inject(ProductsService);

  public sizeCatalog = signal<SizeProductModel[]>([]);
  public materialCatalog = signal<MaterialProductModel[]>([]);

  ngOnInit(): void {
    this.getCatalogSizeProduct();
    this.getCatalogMaterialProduct();
  }

  getCatalogSizeProduct() {
    this.productService.getSizeProduct().subscribe({
      next: response => this.sizeCatalog.set(response)
    })
  }

  getCatalogMaterialProduct() {
    this.productService.getMaterialProduct().subscribe({
      next: response => this.materialCatalog.set(response)
    })
  }


}
