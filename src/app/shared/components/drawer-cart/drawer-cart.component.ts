import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CartItem } from '../../../core/models/cart-item.model';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';
import { Router } from '@angular/router';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { NoDataComponent } from '../no-eventos/no-data.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'shared-drawer-cart',
  standalone: true,
  imports: [
    CommonModule,
    ProductCartComponent,
    NoDataComponent
  ],
  templateUrl: './drawer-cart.component.html',
  styleUrl: './drawer-cart.component.scss',
  animations: [
    trigger('drawerSlide', [
      state(
        'open',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(100%)',
        })
      ),
      transition('closed => open', [animate('300ms ease-out')]),
      transition('open => closed', [animate('300ms ease-in')]),
    ]),
    trigger('overlayFade', [
      state(
        'open',
        style({
          opacity: 1,
          display: 'block',
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          display: 'none',
        })
      ),
      transition('closed => open', [animate('300ms ease-in')]),
      transition('open => closed', [animate('300ms ease-out')]),
    ]),
  ],
})

export class DrawerCartComponent implements OnInit, OnDestroy {

  private readonly cartService = inject(CartService);
  private readonly svgService = inject(SvgService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);


  private subscription!: Subscription;
  public cartItems = signal<CartItem[]>([]);
  public svgClose = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.close));
  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRight));
  public svgTrash = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.trash));
  public svgBag = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.bag));
  public subTotal = signal<number>(0);
  public totalProducts = signal<number>(0);
  public msg = 'Tu cesta está vacía';


  ngOnInit() {
    this.subscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItems.set(items);
      this.geSubtotalPrice();
    });
    this.cartService.drawerOpen$.subscribe(() => {
      this.openDrawer();
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

  isDrawerOpen = false;
  isDrawerVisible = false;

  openDrawer() {
    this.isDrawerVisible = true;
    setTimeout(() => {
      this.isDrawerOpen = true;
    }, 10);
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    setTimeout(() => {
      this.isDrawerVisible = false;
    }, 300);
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
