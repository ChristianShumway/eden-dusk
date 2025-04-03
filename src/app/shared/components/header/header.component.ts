import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItemModel } from '../../../core/models/item-menu.model';
import { DrawerCartComponent } from '../drawer-cart/drawer-cart.component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'shared-header',
  standalone: true,
  imports: [ CommonModule, DrawerCartComponent, MenuComponent ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public itemsMenu: MenuItemModel[] = [
    { name: 'home', path: '/home' },
    { name: 'transmisiones', path: '/transmisiones' },
    { name: 'nuestra historia', path: '/historia' },
    { name: 'blog', path: '/blog' },
    { name: 'galeria', path: '/galeria' }
  ];

  isScrolled = false; // Variable para controlar el estado del navbar
  isNavbarOpen = false;
  urlImageMain = '';
  urlImageblack = 'https://raw.githubusercontent.com/ChristianShumway/eden-dusk/refs/heads/master/src/assets/images/logos/EdenDusk-black.png';
  urlimageWhite = 'https://raw.githubusercontent.com/ChristianShumway/eden-dusk/refs/heads/master/src/assets/images/logos/EdenDusk-white.png';

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
  ngOnInit(): void {
    this.urlImageMain = this.urlImageblack;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 80; // Detecta cuando el scroll supera los 60px
    this.urlImageMain = !this.isScrolled ? this.urlImageblack : this.urlimageWhite;
  }

}
