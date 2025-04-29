import { Component } from '@angular/core';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { PathsEnum } from '../../../../core/utils/paths.enum';

@Component({
  selector: 'blog-articulo-feed',
  standalone: true,
  imports: [
    BackgroundImagePipe
  ],
  templateUrl: './articulo-feed.component.html',
  styleUrl: './articulo-feed.component.scss'
})
export class ArticuloFeedComponent {

  public urlImageBackground: string = `${PathsEnum.URLIMAGES}/_NEL2385-min.jpg`;

}
