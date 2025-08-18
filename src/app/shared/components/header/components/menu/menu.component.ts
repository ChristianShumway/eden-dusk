import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MenuItemModel } from '../../../../../core/models/item-menu.model';
import { ItemMenuComponent } from '../item-menu/item-menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'header-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ItemMenuComponent
  ],
  template: `
    <!-- <ul class="flex flex-col gap-2 p-4 lg:p-0 mt-4 font-medium border-transparent rounded-md bg-transparent lg:space-x-8
            rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-transparent dark:bg-black/90 lg:dark:bg-transparent
            dark:border-transparent">
      @for (item of itemsMenu(); track $index) {
        <header-item-menu [itemMenu]="item" (clickItemMenu)="clickItemMenu.emit()" />
      }
    </ul> -->

    @for (item of itemsMenu(); track $index) {
      <li class="relative group list-none">
        <!-- Si tiene hijos -->
        @if(item.children) {
          <button
            type="button"
            (click)="toggleSubmenu(item)"
            class="block border-none text-grays-100 py-4 px-3 rounded lg:bg-transparent lg:p-0 hover:bg-black-100 hover:lg:bg-transparent hover:lg:text-white text-center w-full"
          >
            {{ item.name | titlecase }}
            <svg class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Submenú -->
          <ul
            class="lg:absolute left-0 mt-0 lg:mt-2 text-center bg-black w-full lg:w-52 backdrop-blur-md rounded-md lg:shadow-lg opacity-1 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-200 transform lg:-translate-y-2 z-50"
            [ngClass]="{
              'block': openSubmenu === item.name,
              'hidden lg:block': openSubmenu !== item.name
            }"
          >
          @for (sub of item.children; track $index) {
            <li>
              <a
                [routerLink]="sub.path"
                routerLinkActive="bg-black font-bold lg:bg-transparent lg:text-white"
                (click)="clickItemMenu.emit(); closeSubmenu()"
                class="block text-grays-100 py-4 px-3 rounded lg:bg-transparent lg:py-3 hover:bg-primary hover:lg:bg-black-100  hover:lg:text-white text-center"
              >
                {{ sub.name | titlecase }}
              </a>
            </li>
          }
          </ul>

        } @else {
          <!-- Si no tiene hijos -->
          <header-item-menu [itemMenu]="item" (clickItemMenu)="clickItemMenu.emit(); closeSubmenu()" />
        }
      </li>
    }

    <div class="mb-4 p-4 block lg:hidden">
      <button class="w-full mt-4 btn__primary">
        Apoya el proyecto
      </button>
    </div>

  `
})

export class MenuComponent {
  public isNavbarOpen = input.required<boolean>();
  public itemsMenu = input.required<MenuItemModel[]>();
  public clickItemMenu = output();

  openSubmenu: string | null = null;

  toggleSubmenu(item: MenuItemModel) {
    if (this.openSubmenu === item.name) {
      this.openSubmenu = null;
    } else {
      this.openSubmenu = item.name;
    }
  }


  closeSubmenu() {
    this.openSubmenu = null;
  }
}
