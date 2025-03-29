import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItemModel } from '../../../../../core/models/item-menu.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'header-item-menu',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  template: `
    <li>
      <a [routerLink]="itemMenu().path"
      [routerLinkActiveOptions]="{ exact: true }"
      routerLinkActive="bg-primary font-bold md:text-primary "
      class="block text-sage-100 py-2 px-3 rounded md:bg-transparent md:p-0  hover:md:text-primary-200"
      >
        {{ itemMenu().name | titlecase }}
      </a>
    </li>
  `,
})

export class ItemMenuComponent {

  public itemMenu = input.required<MenuItemModel>();
}
