import { Component } from '@angular/core';
import { PathsEnum } from '../../../../core/utils/paths.enum';
import { DialogHelpFloatComponent } from '../../../../shared/components/dialog-help-float/dialog-help-float.component';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';

@Component({
  selector: 'products-layout',
  standalone: true,
  imports: [
    DialogHelpFloatComponent,
    BackgroundImagePipe
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

    public urlImageBackground: string = `${PathsEnum.URLIMAGES}/_NEL2464-min.jpg`;
    public titleMsg: string = 'Explora nuestos productos';
    public descriptionMsg: string = 'Desplazate hacia abajo y selecciona tu productos favoritos.';

}
