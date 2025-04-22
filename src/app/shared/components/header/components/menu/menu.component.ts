import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MenuItemModel } from '../../../../../core/models/item-menu.model';
import { ItemMenuComponent } from '../item-menu/item-menu.component';

@Component({
  selector: 'header-menu',
  standalone: true,
  imports: [
    CommonModule,
    ItemMenuComponent
  ],
  template: `
    <ul class="flex flex-col gap-2 p-4 md:p-0 mt-4 font-medium border-transparent rounded-lg bg-transparent md:space-x-8
            rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-black md:dark:bg-transparent
            dark:border-transparent">
      @for (item of itemsMenu(); track $index) {
        <header-item-menu [itemMenu]="item" (clickItemMenu)="clickItemMenu.emit()" />
      }
    </ul>
  `
})

export class MenuComponent {
  public isNavbarOpen = input.required<boolean>();
  public itemsMenu = input.required<MenuItemModel[]>();
  public clickItemMenu = output()
}
