import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CartItem } from '../../../core/models/cart-item.model';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';

@Component({
  selector: 'shared-drawer-cart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './drawer-cart.component.html',
  styleUrl: './drawer-cart.component.scss'
})
export class DrawerCartComponent implements OnInit, OnDestroy {

  private readonly cartService = inject(CartService);
  private readonly svgService = inject(SvgService);

  private subscription!: Subscription;
  public cartItems = signal<CartItem[]>([]);
  public svgTrash = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.trash));
  public svgClose = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.close));

  ngOnInit() {
    this.subscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItems.set(items);
    });
  }

  increase(item: CartItem) {
    this.cartService.updateQuantity(item.productId, item.size.id, item.material.id, item.quantity + 1);
  }

  decrease(item: CartItem) {
    this.cartService.updateQuantity(item.productId, item.size.id, item.material.id, item.quantity - 1);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item.productId, item.size.id, item.material.id);
  }

  closeDrawer() {
    const drawerEl = document.getElementById('drawer-cart-eden');
    if (!drawerEl) return;

    // @ts-ignore
    const drawerInstance = new Drawer(drawerEl, {
      placement: 'right'
    });

    drawerInstance.hide();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
