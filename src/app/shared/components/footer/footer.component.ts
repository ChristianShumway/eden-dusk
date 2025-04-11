import { Component } from '@angular/core';
import { MenuItemModel } from '../../../core/models/item-menu.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-footer',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  public urlimageWhite = 'https://raw.githubusercontent.com/ChristianShumway/eden-dusk/refs/heads/master/src/assets/images/logos/EdenDusk-white.png';
  private readonly fullDate = new Date();
  public year = this.fullDate.getFullYear()
  public itemsMenu: MenuItemModel[] = [
    { name: 'home', path: '/home' },
    { name: 'transmisiones', path: '/transmisiones' },
    { name: 'nuestra historia', path: '/historia' },
    { name: 'blog', path: '/blog' },
    { name: 'galeria', path: '/galeria' }
  ];


}
