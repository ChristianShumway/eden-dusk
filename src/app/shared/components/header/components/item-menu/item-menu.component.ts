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
    <a [routerLink]="itemMenu().path"
    [routerLinkActiveOptions]="{ exact: false }"
    routerLinkActive="bg-black-100 font-bold lg:bg-transparent lg:text-white"
    (click)="clickItemMenu.emit()"
    class="block text-grays-100 py-4 px-3 rounded lg:bg-transparent lg:p-0 hover:bg-black-100 hover:lg:bg-transparent  hover:lg:text-white text-center"
    >
      {{ itemMenu().name | titlecase }}
    </a>
  `,
})

export class ItemMenuComponent {

  public itemMenu = input.required<MenuItemModel>();
  public clickItemMenu = output();
}
