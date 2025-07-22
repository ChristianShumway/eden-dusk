// services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

const CART_KEY = 'cart_items';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = [];
  private readonly cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private readonly cartCountSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.cartItems = this.getCart();
    this.cartItemsSubject.next(this.cartItems);
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
    this.cartItemsSubject.next(this.cartItems); // 🔁 actualiza observable
    this.updateCartCount();
  }

  private updateCartCount() {
    const total = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(total);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable(); // 🟢 suscribible
  }

  getCartCount(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }

  addToCart({ productId, name, image, size, material, price }: CartItem) {
    const cart = this.getCart();
    const existingItem = cart.find(item =>
      item.productId === productId &&
      item.size.id === size.id &&
      item.material.id === material.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ productId, name, image, size, material, quantity: 1, price });
    }

    this.saveCart(cart);
  }

  updateQuantity(productId: number, sizeId: number, materialId: number, quantity: number) {
    const cart = this.getCart();
    const item = cart.find(item =>
      item.productId === productId &&
      item.size.id === sizeId &&
      item.material.id === materialId
    );

    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(productId, sizeId, materialId);
        return;
      }
      this.saveCart(cart);
    }
  }

  removeItem(productId: number, sizeId: number, materialId: number) {
    const cart = this.getCart().filter(item =>
      !(item.productId === productId &&
        item.size.id === sizeId &&
        item.material.id === materialId)
    );
    this.saveCart(cart);
  }

  clearCart() {
    if (!this.isBrowser()) return;
    localStorage.removeItem(CART_KEY);
    this.cartItems = [];
    this.cartItemsSubject.next([]); // 🔁 actualiza observable
    this.updateCartCount();
  }
}
