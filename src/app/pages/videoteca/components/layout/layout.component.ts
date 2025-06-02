import { Component } from '@angular/core';
import { PathsEnum } from '../../../../core/utils/paths.enum';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';

@Component({
  selector: 'videoteca-layout',
  standalone: true,
  imports: [
    BackgroundImagePipe
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  public urlImageBackground: string = `${PathsEnum.URLIMAGES}/_NEL3202-min.jpg`;

}
