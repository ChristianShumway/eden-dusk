import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnReturnComponent } from '../../../../shared/components/btn-return/btn-return.component';
import { SlideImagesProductComponent } from '../../components/slide-images-product/slide-images-product.component';
import { ActionsProductComponent } from '../../components/actions-product/actions-product.component';
import { ProductsService } from '../../../../core/services/products.service';
import { MaterialProductModel, ProductModel, ProductTotalModel, SizeProductModel } from '../../../../core/models/products.model';
import { InfoProductComponent } from '../../components/info-product/info-product.component';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ComentariosComponent } from '../../../blog/components/comentarios/comentarios.component';
import { AgregarComentarioComponent } from '../../../blog/components/agregar-comentario/agregar-comentario.component';
import { CartService } from '../../../../core/services/cart.service';
import { CartItem } from '../../../../core/models/cart-item.model';
import { ToastService } from '../../../../core/services/toast.service';
import { switchMap } from 'rxjs';

const DUMMY_PRODUCT: ProductTotalModel = {
  id: 1,
  date: '2025/07/16',
  sourceUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
  description: 'Una obra fotográfica moderna impresa en alta calidad, ideal para decoración contemporánea.',
  name: 'Amanecer en el Valle',
  price: 0,
  prices: [],
  license: 2, // por ejemplo: licencia de uso limitado
  type: 1,     // por ejemplo: tipo fotografía
  size: '60x90 cm',
  comments: [
  ],
  slideImages: [],
  rating: 0,
  stock: 0,
  smallDescription: '',
  detailProduct: '',
  detailDelivery: '',
};
@Component({
  selector: 'app-main-product',
  standalone: true,
  imports: [
    CommonModule,
    BtnReturnComponent,
    SlideImagesProductComponent,
    ActionsProductComponent,
    InfoProductComponent,
    ComentariosComponent,
    AgregarComentarioComponent
  ],
  templateUrl: './main-product.component.html',
  styleUrl: './main-product.component.scss'
})
export class MainProductComponent implements OnInit {

  private readonly productService = inject(ProductsService);
  private readonly ar = inject(ActivatedRoute);
  private readonly svgService = inject(SvgService);
  private readonly cartService = inject(CartService);
  private readonly toastService = inject(ToastService);

  public currencyProduct = signal<ProductTotalModel>(DUMMY_PRODUCT);
  public sizeCatalog = signal<SizeProductModel[]>([]);
  public materialCatalog = signal<MaterialProductModel[]>([]);
  public svgComment = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.msgDialog));
  public detailDelivery = signal<SafeHtml>('');
  public detailProduct = signal<SafeHtml>('');
  public selectedTab: 'leer' | 'agregar' = 'leer';
  public commentsMap = {
    '=1': 'comentario',
    'other': 'comentarios',
  };

  ngOnInit(): void {
    this.initParams();
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

  selectTab(tab: 'leer' | 'agregar') {
    this.selectedTab = tab;
  }

  onChangeTab(tab: 'leer' | 'agregar') {
    this.selectedTab = tab;
    this.initParams();
  }

  initParams() {
    this.ar.paramMap.pipe(
      switchMap( (params: ParamMap) => {
        return this.productService.getProductById(Number(params.get('id')));
      })
    ).subscribe({
      next: response => {
        if(!response) return;
        console.log(response);
        this.currencyProduct.set(response);
        this.detailDelivery.set(this.svgService.getTrueHtml(this.currencyProduct().detailDelivery));
        this.detailProduct.set(this.svgService.getTrueHtml(this.currencyProduct().detailProduct));
      }
    })
  }

  onChangePriceByMaterialAndSize() {}

  onAddPedido(dataProductSelected: any) {
    const productCart: CartItem = {
      productId: this.currencyProduct().id,
      name: this.currencyProduct().name,
      image: this.currencyProduct().sourceUrl,
      size: this.getSizeProductById(dataProductSelected.selectedSize) || {id: 1, value: ''},
      material: this.getMaterialProductById(dataProductSelected.material) || {id: 1, value: '', subValue: ''},
      quantity: 1,
      price: dataProductSelected.price
    };

    this.cartService.addToCart(productCart);
    this.toastService.showSuccess(`
      Has agregado un producto a tu cesta de compra.
    `);
    this.openCartDrawer();
  }

  getSizeProductById(id: number) {
    return this.sizeCatalog().find(item => item.id === id);
  }

  getMaterialProductById(id: number) {
    return this.materialCatalog().find(item => item.id === id);
  }

  openCartDrawer() {
    this.cartService.openDrawer();
  }

}
