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

  public urlImageBackground: string = 'https://uc2554f2fa21bddd905f7ebc1bb5.previews.dropboxusercontent.com/p/thumb/AClU3ScnGhItiwdg0Vo0e-LWx_Ueh81L3cJNAhuAU-8kSAP62hVnN6DGp71ZvFGmL1Nah5zqgUqkQUJB5UFO53BxTMrx3DB5NNHQSdcwiP-xJBLG58X6-Geoux3Cz5xswX-ZruoqlJtB-dRDAVhTV_2X7vMNQ9Qo8bwCoWUL9Aqc4ac8KfWo-km9tE06sCPPw54epdaSXWZF55y7Co3QMDYRhqshBzWDuoaW54EdYCnvzug_v31_L0DyPeXY1ITfB8bZ3ibRolG_GE-ngesS5ZLsagujDREBEIGJOeO7eMOTMsfZYfdqSqEyKQaHC1LXQoE6YRaimhWPCJ8PTf1-GvP0nKDwKVv9Lt21-C8I2mRU7B3gex4427xcJD5hL60rcrC5RKTAPZTggN1KmMrgd85aA8Ty_1I5wkjenMjR-Ov-VUCVBRpX0eeORpi10EqbriHvD1ifJeoDjeLH30KWUVqgd6K6SP9BescENI8gLiOzgNcHRIY6st2la5dsMY0HM1NyTkngAEIcwRaWn0F5AqbKawBvXJy1OFngINiVFpAevoxseLR1fBNQLrv_N2urpq6NCrYX3Pru9QE1NQxcHHSNijMYDsnTuOF5_0XZq-CyF-_047Lr9jdwBWivb-YFYXX2MsSmjlCsMTJZVGtVK1zQaUSmyTNUJo0yKMbLXXWmsjjy5i53AwsMR91vUVp30qifkImYNPs4un-sZSZv_QeOuNdGmja3HJ66jZtj2cmaLkfIJIqr7hhLAVwfNzrx4OHDLeGlirpjuhPp06jAcM1D/p.jpeg';
  svgSemiColons: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.semicolons);

}
