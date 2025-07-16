import { AfterViewInit, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { initTabs } from 'flowbite';

@Component({
  selector: 'products-info-product',
  standalone: true,
  imports: [],
  templateUrl: './info-product.component.html',
  styleUrl: './info-product.component.scss'
})
export class InfoProductComponent implements AfterViewInit {

  private readonly router = inject(Router);

  ngAfterViewInit(): void {
    initTabs();
    this.router.events.subscribe(() => {
      setTimeout(() => {
        initTabs(); // vuelve a correrlo cuando cambia la ruta
      }, 100); // pequeño delay para que el DOM esté listo
    });
  }

}
