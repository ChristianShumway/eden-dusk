import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class HeaderComponent {

  public itemsMenu: MenuItemModel[] = [
    { name: 'home', path: '/home' },
    { name: 'transmisiones', path: '/transmisiones' },
    { name: 'nuestra historia', path: '/historia' },
    { name: 'blog', path: '/blog' },
    { name: 'galeria', path: '/galeria' }
  ]

  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

}
