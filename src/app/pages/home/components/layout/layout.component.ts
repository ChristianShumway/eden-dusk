import { Component } from '@angular/core';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { ItemLayoutModel } from '../../../../core/models/item-layout.model';

@Component({
  selector: 'home-layout',
  standalone: true,
  imports: [
    BackgroundImagePipe
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})

export class LayoutComponent {

  public urlImageBackground: string = 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  public itemsLayout: ItemLayoutModel[] = [
    {
      text: 'Texto muestra',
      url: 'https://images.pexels.com/photos/31339924/pexels-photo-31339924/free-photo-of-vibrantes-flores-de-cerezo-en-la-primavera-berlinesa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      visible: true
    },
    {
      text: 'Texto muestra',
      url: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      visible: true
    },
    {
      text: 'Texto muestra',
      url: 'https://images.pexels.com/photos/2310641/pexels-photo-2310641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      visible: true
    }
  ];

}
