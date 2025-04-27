import { Component } from '@angular/core';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { PathsEnum } from '../../../../core/utils/paths.enum';

@Component({
  selector: 'nosotros-layout',
  standalone: true,
  imports: [
    BackgroundImagePipe
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  public urlImageBackground: string = `${PathsEnum.URLIMAGES}/_NEL2722-min.jpg`;

}
