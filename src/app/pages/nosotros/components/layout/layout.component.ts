import { Component, inject } from '@angular/core';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

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

  private readonly svgService = inject(SvgService);

  public urlImageBackground: string = 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  svgSemiColons: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.semicolons);

}
