import { Component, inject, input, signal } from '@angular/core';
import { CartItem } from '../../../core/models/cart-item.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';

@Component({
  selector: 'shared-product-cart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './product-cart.component.html',
})

export class ProductCartComponent {

  private readonly cartService = inject(CartService);
  private readonly svgService = inject(SvgService);

  public product = input.required<CartItem>();
  public svgTrash = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.trash));

  increase(item: CartItem) {
    this.cartService.updateQuantity(item.productId, item.size.id, item.material.id, item.quantity + 1);
  }

  decrease(item: CartItem) {
    this.cartService.updateQuantity(item.productId, item.size.id, item.material.id, item.quantity - 1);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item.productId, item.size.id, item.material.id);
  }

}
