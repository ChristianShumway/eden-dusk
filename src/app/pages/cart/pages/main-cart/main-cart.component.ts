import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { SvgService } from '../../../../core/services/svg.service';
import { Subscription } from 'rxjs';
import { CartItem } from '../../../../core/models/cart-item.model';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ProductCartComponent } from '../../../../shared/components/product-cart/product-cart.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-main-cart',
  standalone: true,
  imports: [
    CommonModule,
    ProductCartComponent
  ],
  templateUrl: './main-cart.component.html',
  styleUrl: './main-cart.component.scss'
})
export class MainCartComponent implements OnInit, OnDestroy {

  private readonly cartService = inject(CartService);
  private readonly svgService = inject(SvgService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  private subscription!: Subscription;
  public cartItems = signal<CartItem[]>([]);
  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRight));
  public svgTrash = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.trash));
  public svgBag = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.bag));
  public subTotal = signal<number>(0);
  public totalProducts = signal<number>(0);
  public totalFreeShipping = 10000;
  public msg = 'Tu cesta está vacía';

  ngOnInit() {
    this.subscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItems.set(items);
      this.geSubtotalPrice();
    });
  }

  geSubtotalPrice() {
    this.subTotal.set(0);
    this.totalProducts.set(0);
    this.cartItems().forEach(({price, quantity}) =>  {
      this.subTotal.update(currencyPrice =>  currencyPrice + (price * quantity));
      this.totalProducts.update(currency =>  currency + quantity);
    });
  }

  deleteAll() {
    this.cartService.clearCart();
    this.toastService.showError(`
      Has eliminado todos tus productos de tu cesta de compra.
    `);
  }

  goToProducts() {
    this.router.navigate(['/productos']);
  }

  goToCart() {
    this.router.navigate(['/carrito']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
