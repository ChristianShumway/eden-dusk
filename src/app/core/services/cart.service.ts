// services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CartItem } from '../models/cart-item.model';

const CART_KEY = 'cart_items';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];
  private readonly cartCountSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.cartItems = this.getCart();
    this.updateCartCount();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  private getCart(): CartItem[] {
    if (!this.isBrowser()) return [];
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  private saveCart(cart: CartItem[]) {
    if (!this.isBrowser()) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cartItems = cart;
    this.updateCartCount();
  }

  private updateCartCount() {
    const total = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(total);
  }

  getCartCount(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }


  addToCart({productId, sizeId, materialId}: CartItem) {
    const cart = this.getCart();

    const existingItem = cart.find(item =>
      item.productId === productId &&
      item.sizeId === sizeId &&
      item.materialId === materialId
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        productId,
        sizeId,
        materialId,
        quantity: 1
      });
    }

    this.saveCart(cart);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  clearCart() {
    if (!this.isBrowser()) return;
    localStorage.removeItem(CART_KEY);
    this.cartItems = [];
    this.updateCartCount();
  }
}
