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

@Component({
  selector: 'shared-drawer-cart',
  standalone: true,
  imports: [
    CommonModule,
    ProductCartComponent
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

  private subscription!: Subscription;
  public cartItems = signal<CartItem[]>([]);
  public svgClose = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.close));
  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRight));

  ngOnInit() {
    this.subscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItems.set(items);
    });
    this.cartService.drawerOpen$.subscribe(() => {
      this.openDrawer();
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
