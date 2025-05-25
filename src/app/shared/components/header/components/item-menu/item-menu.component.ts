import { Component, input, output } from '@angular/core';
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
      [routerLinkActiveOptions]="{ exact: false }"
      routerLinkActive="bg-primary font-bold lg:text-primary "
      (click)="clickItemMenu.emit()"
      class="block text-sage-100 py-2 px-3 rounded lg:bg-transparent lg:p-0  hover:lg:text-primary-200"
      >
        {{ itemMenu().name | titlecase }}
      </a>
    </li>
  `,
})

export class ItemMenuComponent {

  public itemMenu = input.required<MenuItemModel>();
  public clickItemMenu = output();
}
