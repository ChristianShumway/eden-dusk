import { Component } from '@angular/core';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { ItemLayoutModel } from '../../../../core/models/item-layout.model';
import { PathsEnum } from '../../../../core/utils/paths.enum';

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

  public urlImageBackground: string = `${PathsEnum.URLIMAGES}/NEL00817.jpg`;

  public itemsLayout: ItemLayoutModel[] = [
    {
      text: 'Texto muestra',
      url: `${PathsEnum.URLIMAGES}/DSC03262.jpg`,
      visible: true
    },
    {
      text: 'Texto muestra',
      url: `${PathsEnum.URLIMAGES}/NEL00829.jpg`,
      visible: true
    },
    {
      text: 'Texto muestra',
      url: `${PathsEnum.URLIMAGES}/NEL05759.jpg`,
      visible: true
    }
  ];

}
