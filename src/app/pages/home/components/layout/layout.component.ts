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

  public urlImageBackground: string = `${PathsEnum.URLIMAGES}/_NEL3001_-min.jpg`;

  public itemsLayout: ItemLayoutModel[] = [
    {
      text: 'Texto muestra',
      url: `${PathsEnum.URLIMAGES}/_ELA8309-min.jpg`,
      visible: true
    },
    {
      text: 'Texto muestra',
      url: `${PathsEnum.URLIMAGES}/_NEL2557-min.jpg`,
      visible: true
    },
    {
      text: 'Texto muestra',
      url: `${PathsEnum.URLIMAGES}/_ELA8285-min.jpg`,
      visible: true
    }
  ];

}
