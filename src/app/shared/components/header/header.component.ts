import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItemModel } from '../../../core/models/item-menu.model';
import { DrawerCartComponent } from '../drawer-cart/drawer-cart.component';
import { MenuComponent } from './components/menu/menu.component';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'shared-header',
  standalone: true,
  imports: [ CommonModule, DrawerCartComponent, MenuComponent ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  cartCount$ = this.cartService.getCartCount(); // observable

  constructor(
    private readonly svgService: SvgService,
    private readonly cartService: CartService
  ) {
  }

  public itemsMenu: MenuItemModel[] = [
    { name: 'inicio', path: '/inicio' },
    { name: 'transmisiones', path: '/transmisiones' },
    { name: 'trayectoria', path: '/trayectoria' },
    { name: 'blog', path: '/blog' },
    { name: 'galeria', path: '/galeria' },
    { name: 'videoteca', path: '/videoteca' },
    { name: 'tienda', path: '/tienda' }

  ];

  isScrolled = false; // Variable para controlar el estado del navbar
  isNavbarOpen = false;
  svgCart: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.cart);
  svgMenu: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.menuTwo);
  urlImageMain = '';
  urlImageblack = 'https://raw.githubusercontent.com/ChristianShumway/eden-dusk/refs/heads/master/src/assets/images/logos/EdenDusk-black.png';
  urlimageWhite = 'https://raw.githubusercontent.com/ChristianShumway/eden-dusk/refs/heads/master/src/assets/images/logos/EdenDusk-white.png';

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  ngOnInit(): void {
    this.urlImageMain = this.urlImageblack;
  }

  openCartDrawer() {
    this.cartService.openDrawer();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 80; // Detecta cuando el scroll supera los 60px
    this.urlImageMain = !this.isScrolled ? this.urlImageblack : this.urlimageWhite;
  }

}
