import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { SvgService } from '../../../../core/services/svg.service';
import { Subscription } from 'rxjs';
import { CartItem } from '../../../../core/models/cart-item.model';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ProductCartComponent } from '../../../../shared/components/product-cart/product-cart.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-cart',
  standalone: true,
  imports: [
    ProductCartComponent
  ],
  templateUrl: './main-cart.component.html',
  styleUrl: './main-cart.component.scss'
})
export class MainCartComponent implements OnInit, OnDestroy {

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
