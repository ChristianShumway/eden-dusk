import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ItemLayoutModel } from '../../../../core/models/item-layout.model';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { isPlatformBrowser } from '@angular/common';

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

  isDarkMode = false;

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
        url: 'https://uc7f047d29a54f4915b244b4c8dc.previews.dropboxusercontent.com/p/thumb/ACmC-LdDTZIi4dd4CpKisWAsy27qNsNqyYkFWR24uvb9_yTnximWJbNd9ZKzuULtZmx6ObhrSXy56MUgtajzrJNo8V68796OGWgFrzstGeNyQ8RDQmq8YGJCQVzzn6GU7z-TVpV0MdcnLtsGc8Br7zejmSU0ZUdgnBWrYnc-XYdrIYTclohrOFWWSNWrgAIVvdO-7NdEDY4QIWhlfERBZToMd1Zvuoxq5TQ3-yguh0hgtZ2OKjDxK_grecbuEwZ-aA72GMfx8ML1zXxJUmVkvVS_HAH-xsIiBQpN90HpQTbyvYr4YpHQwdygLxqyJgxkvlmBowCfAIg_dFuvq1d2dJp8E8rdoXrTkplvrejCC0eQYlavmN3xOopugS5lEFwrD9CJF27W1C-yId1FmB1b-OMit58GptWAaJtyMoXoz9BLDK-pe9u0cgCDF6_VCMH35hZDs_iyyGp8ac2zSXsEM-0oN3i_YkDgSx0VaFXUHImSpGeKh_ydXFZkui1HvMHTu7-t6A2C7kmJX_EqJ1pPgGj4G2PP9STJV75Q8ixC1KTue58qLAI0Wgge_VAd44TabZy3newEGK8Whfd6uMJek4nb4yRqml4CkYqJHeJaQVtZvlpa3nz7bmmVKb6btZj-YWDZ51Xt4xbci_wgxCDGL_4Y/p.jpeg',
        visible: true
      },
      {
        text: 'Título',
        url: 'https://uc0f9b3368d0206fc112cf8123ca.previews.dropboxusercontent.com/p/thumb/ACnVxRwP4nLescBEBWuFOp23ov3gmRmsI-7MVkAbLoPNi0zRZ9P4rtKVP2g93j9yWBCOjQlD3t7weEBRO5WXe7CJwGU8oiSteTykjLxpE_ck5It-OGfeVRtNdks_BhSY5_WmYOoNjA8krfSe0QuPqSlvWmYAwDFcYsgF6pj_M9Yr5ADv5Gj2RIxQ7cjbYHLvcOHmhIBxyPudg7Sz_4Xofgr2PAhtLi_0EFogGarEs0SOlsDsL-mNn044cMBzuJvcj2B_kHKx4nkM4251Ngm8yuMeKTxcMkfJXVGnEVL6fg5gaycKClqftVOJ3VkBbfY7MyzdCH-t3OsbDqS5foSwiz-XYj-cl5EOXom98sObSC6npsBMDlk8K5BrXTHzQItBAPvHL_BQywHSODE0oHwNGwuMXpbbbQLlqu8f_I0PsWbxq6E0YAi1VDc00mrgpK3T1b7hom0zZA1yyZGr7zSE-aXylQ9OW-zqsWsoBf04Z5pP3VvrxMNoTznwQgQXbIO1kvjotOpmAjU5Rb1Z5mZLZkKMRcQsCp6t4NF9XtgkqUp01gl5tC1E1Q32vI8iZqsQDkvgui3_17Ms_7zIwzfLfrJjxazhFFyPjyb4xI26btSI4ejOrkVl2nJkv7SqCKZ0SGbR2YB-jJg4gFb4dcSxE-zXXRlmFv0pTCui2x_osaPK1B0ZSOTcK-L0AgQnbRKlpzHYYARwjFAq4ypJ0XER_r9MrNAO-X_kk3Rmh8p1qeqdtTbQa7mPHXb6yW0d80F6RaE4Zm3dBlwARxRxiH0vNxsJ3EFitu9yMK1EJGjW0U91B6hlOyZuK2m9NzNuqpIMSfv52B0DCNrFFVdoslbfe8dU/p.jpeg',
        visible: true
      },
      {
        text: 'Título',
        url: 'https://ucc5ba5d35a91c5d329a1b2ed28c.previews.dropboxusercontent.com/p/thumb/ACmLBou2ylIovZDjEL8ouEovi6oRAbWm_EMGb6MNa6qMlCXM9-uNQ0vR9v8T-VHJ4-OTqSQ5Kw6NHl0zQfNfFilLVj_zu-GpLnW3m3qeANykOPvu9OZqXkPI22M4ceCjWkmypSoMcNqcd_7vx7BMqTtC8iAqGbX1drkuXTW6jWckEPI7FNQ2-wg1O0vh3VRDW3GRqdKzSZkKW3fUcr9CfurxtzzeeXVD8v6x41VtyaEWKDX0pLyDNZO7eC-4W5W9ICulLhk2R19O3p8LSbMWPgM4Rlgz_gDTI3yzHVKia4m1bDSv-fs7hU8bC7rPpgjPDCZph0gScW9gMY33tdFuMBdawlGDMq-tkDrLBpbVMiCrNVcFV9RCWCZpxe8DNHowqQfeANc1XASxBDZHUq57VnQ4CLTOWOPFayTLB5wwjsqndQ/p.jpeg',
        visible: true
      }
    ];

}
