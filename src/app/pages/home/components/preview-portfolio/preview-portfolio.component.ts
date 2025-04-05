import { Component } from '@angular/core';
import { ItemLayoutModel } from '../../../../core/models/item-layout.model';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';

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

  urlLogo = 'https://raw.githubusercontent.com/ChristianShumway/eden-dusk/refs/heads/master/src/assets/images/logos/EdenDusk-white.png';

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
