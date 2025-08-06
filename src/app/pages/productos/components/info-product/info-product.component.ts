import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'products-info-product',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './info-product.component.html',
  styleUrl: './info-product.component.scss'
})
export class InfoProductComponent {

  private readonly router = inject(Router);

  public selectedTab: 'detalles' | 'envio' = 'detalles';
  public detailDelivery = input.required<SafeHtml>();
  public detailProduct = input.required<SafeHtml>();

  selectTab(tab: 'detalles' | 'envio') {
    this.selectedTab = tab;
  }

  onChangeTab(tab: 'detalles' | 'envio') {
    this.selectedTab = tab;
  }

}
