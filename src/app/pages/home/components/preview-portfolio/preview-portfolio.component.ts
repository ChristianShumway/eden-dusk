import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ItemLayoutModel } from '../../../../core/models/item-layout.model';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'home-preview-portfolio',
  standalone: true,
  imports: [
    BackgroundImagePipe
  ],
  templateUrl: './preview-portfolio.component.html',
  styleUrl: './preview-portfolio.component.scss'
})
export class PreviewPortfolioComponent {

  isDarkMode = false;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  urlLogoWhite = 'https://raw.githubusercontent.com/ChristianShumway/eden-dusk/refs/heads/master/src/assets/images/logos/EdenDusk-white.png';
  urlLogoBlack= 'https://raw.githubusercontent.com/ChristianShumway/eden-dusk/refs/heads/master/src/assets/images/logos/EdenDusk-black.png';


  get logoUrl(): string {
    return this.isDarkMode ? this.urlLogoWhite : this.urlLogoBlack;
  }

    public itemsPortfolio: ItemLayoutModel[] = [
      {
        text: 'Título',
        url: 'https://images.pexels.com/photos/31339924/pexels-photo-31339924/free-photo-of-vibrantes-flores-de-cerezo-en-la-primavera-berlinesa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        visible: true
      },
      {
        text: 'Título',
        url: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        visible: true
      },
      {
        text: 'Título',
        url: 'https://images.pexels.com/photos/2310641/pexels-photo-2310641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        visible: true
      }
    ];

}
