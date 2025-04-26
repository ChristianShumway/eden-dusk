import { Component, inject, Inject, PLATFORM_ID, signal } from '@angular/core';
import { ItemLayoutModel } from '../../../../core/models/item-layout.model';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { isPlatformBrowser } from '@angular/common';
import { PathsEnum } from '../../../../core/utils/paths.enum';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

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

  private readonly svgService = inject(SvgService);

  isDarkMode = false;
  svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRight));

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  urlLogoWhite = 'https://raw.githubusercontent.com/ChristianShumway/eden-dusk/refs/heads/master/src/assets/images/logos/EdenDusk-white.png';
  urlLogoBlack= 'https://raw.githubusercontent.com/ChristianShumway/eden-dusk/refs/heads/master/src/assets/images/logos/EdenDusk-black.png';


  get logoUrl(): string {
    return this.isDarkMode ? this.urlLogoWhite : this.urlLogoBlack;
  }

    public itemsPortfolio: ItemLayoutModel[] = [
      {
        text: 'Título',
        url: `${PathsEnum.URLIMAGES}/_NEL2722-min.jpg`,
        visible: true
      },
      {
        text: 'Título',
        url: `${PathsEnum.URLIMAGES}/_NEL2385-min.jpg`,
        visible: true
      },
      {
        text: 'Título',
        url: `${PathsEnum.URLIMAGES}/_ELA8309-min.jpg`,
        visible: true
      }
    ];

}
