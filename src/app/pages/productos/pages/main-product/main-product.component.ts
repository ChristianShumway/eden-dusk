import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnReturnComponent } from '../../../../shared/components/btn-return/btn-return.component';
import { SlideImagesProductComponent } from '../../components/slide-images-product/slide-images-product.component';
import { ActionsProductComponent } from '../../components/actions-product/actions-product.component';
import { ProductsService } from '../../../../core/services/products.service';
import { MaterialProductModel, ProductModel, SizeProductModel } from '../../../../core/models/products.model';
import { InfoProductComponent } from '../../components/info-product/info-product.component';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ActivatedRoute } from '@angular/router';
import { ComentariosComponent } from '../../../blog/components/comentarios/comentarios.component';
import { AgregarComentarioComponent } from '../../../blog/components/agregar-comentario/agregar-comentario.component';
import { CartService } from '../../../../core/services/cart.service';
import { CartItem } from '../../../../core/models/cart-item.model';

const DUMMY_PRODUCT: ProductModel = {
  id: 1,
  date: '2025/07/16',
  sourceUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
  description: 'Una obra fotográfica moderna impresa en alta calidad, ideal para decoración contemporánea.',
  name: 'Amanecer en el Valle',
  price: 1999.00,
  license: 2, // por ejemplo: licencia de uso limitado
  type: 1,     // por ejemplo: tipo fotografía
  size: '60x90 cm',
  comments: [
    {
      id: 1,
      name: 'Luis García',
      email: 'luis@example.com',
      comment: 'La calidad de impresión es excelente. Repetiré sin duda.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=3',
      date: new Date('2025-07-10'),
      postId: 1
    },
    {
      id: 2,
      name: 'María López',
      email: 'maria@example.com',
      comment: 'Muy bonito, aunque esperaba un marco incluido.',
      rating: 4,
      avatar: 'https://i.pravatar.cc/150?img=5',
      date: new Date('2025-07-12'),
      postId: 1
    }
  ],
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

  public sizeCatalog = signal<SizeProductModel[]>([]);
  public materialCatalog = signal<MaterialProductModel[]>([]);
  public product = signal<ProductModel>(DUMMY_PRODUCT);
  public svgComment = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.msgDialog));
  public selectedTab: 'leer' | 'agregar' = 'leer';
  public commentsMap = {
    '=1': 'comentario',
    'other': 'comentarios',
  };

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

  selectTab(tab: 'leer' | 'agregar') {
    this.selectedTab = tab;
  }

  onChangeTab(tab: 'leer' | 'agregar') {
    this.selectedTab = tab;
    // this.initParams(); //TODO aquí refresca la petición del getbyid
  }

  onAddPedido(dataProductSelected: any) {
    const productCart: CartItem = {
      productId: DUMMY_PRODUCT.id,
      name: DUMMY_PRODUCT.name,
      image: DUMMY_PRODUCT.sourceUrl,
      size: this.getSizeProductById(dataProductSelected.selectedSize) || {id: 1, value: ''},
      material: this.getMaterialProductById(dataProductSelected.material) || {id: 1, value: '', subValue: ''},
      quantity: 1,
      price: DUMMY_PRODUCT.price
    };

    this.cartService.addToCart(productCart);
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
