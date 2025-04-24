import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, Inject, PLATFORM_ID } from '@angular/core';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

@Component({
  selector: 'home-preview-store',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundImagePipe
  ],
  templateUrl: './preview-store.component.html',
  styleUrl: './preview-store.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PreviewStoreComponent {

  private readonly svgService = inject(SvgService);

  svgArrow: SafeHtml = this.svgService.getSanitizedSvg(SvgIcons.arrowRight);
  slidesPerView = 3;
  screenWidth: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    this.updateSlidesScreenSize();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSlidesScreenSize();
  }

  private updateSlidesScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
      if(this.screenWidth <= 768) {
        this.slidesPerView = 1;
      } else if( this.screenWidth > 768 && this.screenWidth <= 1024) {
        this.slidesPerView = 3;
      } else {
        this.slidesPerView = 4;
      }
    }
  }

  productos = [
    {
      name: 'Producto 1',
      description: 'Descripción del producto 1',
      price: 1000,
      image: 'https://uc2158a76490f54b84534159b64d.previews.dropboxusercontent.com/p/thumb/ACnmaAEkpjNWwqx383i7qH6oNy1DfdWM_DLJNkheiKdbmUkZYyiWDkQH5uyx2troigdgd8E2vDBlkEzYrzXekVe5yF0gl8-naWlur-MojWwlZltof41P_2e7zKPBpwwjIcRGm7X4VU6_Insx8DYdOvyDRTQGtznE06fh4vPCJsW5iic1yQBQkpJQAPR2nZFlBFn1x3gcFkpiN2yEWtpVtoPxL0MROGBfyJYhOm3DSD_LIgP_kjCNWvkubLYV6R6sFXbJZEPUwyCDEp2A6Pfzg0D_ieSzFgZnsyftTDBjz8fFqeOHjNORWVn5uxt5JLEzY5dfUuGME-VL6oN7F_t1q9ZCwfj1bdok1F0zVlDfEe2WgvA15PbY_K0nkqvDUa__Sn8wPZ2bdjSx1TKzrRZdX2gvwUqWLzU_ACbTS5oBkTVzRDl9giNHDOuMPQ8G-1go8PsuIc3aZUq8uVekD2oe1X4viBjZ-DhrcuyVg_AsfT8DKBhFBnsf391zhs9pndk-a5hTAfM2PvDuq5qYA6Ei78QeKV0jEXbkSK4hSgEn3tO9uw/p.jpeg'
    },
    {
      name: 'Producto 2',
      description: 'Descripción del producto 2',
      price: 230,
      image: 'https://ucf32db46f9f60dcd907b26e1d35.previews.dropboxusercontent.com/p/thumb/ACmAoHnDQLsiVjx2lBuzMFC8E5SuwozKd4ZGT0mqT_E7CMPxmywzEOkBcYHGErmviLFhBAMTQWqJdCqEN3tX9H0phrSR1KiQweXoejXpaUl4l9nJCy8BDJV-7qxPi0Cz1d8Cl8g1FDDbcGu4H4eihHG0AccI0E3McM6oQc336UCZOc1eb7l0ZPkgQIqv4ycNVSY_TSPmKoRGK8JhSsdkx7Bi7I7PGJ0hXiWenx7802imYwlKtJP1bYVec3Lsi_a8zCY_UqLkTQFEeITg45tqwm7DwMColpBXvs1pVC4r_6blYK_WObcKwMRzcvHVM9VoseT2KmOphFk1Lq27FZGHJoNr08V0_3ScC4Hsk3x41TiXFwVTLF8Dz6elFiY9HydIMwNLV7IO7kEE8wqdC_kA_EDDnOalHl0Vt2qzpPLE3vOdAcRuPCqgyCoTAnb0KpkcwjK8_n75-B_eVLjBg-gzzE0ZQmJgejEgLkc96O2rlDj5bmZk4yVZ-D5tJatzYyDLiI_CiypOxYohS0wzXGhsvkXxMtO5EEHiyqTWiTQnNoZX7A/p.jpeg'
    },
    {
      name: 'Producto 3',
      description: 'Descripción del producto 3',
      price: 340,
      image: 'https://ucbb1e6329d0f43b19f38f7fe8bb.previews.dropboxusercontent.com/p/thumb/AClPZOfNbG0ezQoNEiNlZ0-qGUlH_j3XwtP6AXfhGGxQ22lgN89Owvsw7bLgJn1epyC2wowKrDBE-zOs8lYcs3ev9OF1sNxG3ljkWsTqdFQ87yJU7DJtp4PIOJvqNqOT7hJH3QsKUBrcHv8bKJsIBixWSKZyWp_mLapEXNOKb1q5MomyEZSNz_2VdWolpyXDPZfJBFLNoCBojrBnv_Q64SG9US5lCBH0gCJaVGBT4X9quiv9-VlYcOVt-IregdyFIynNmav4hg2ULybv-yvgrlwm2qWlQWDK8S14efdegjcSUzMW7kBmrCYxM7wfTwQHr-_0bn32hMINVZ13_sSfxNnnwjHOPJPivUgv3a2w1QSRd8pvGf2oG5vbqZauAELiM4G6Iqt_LEk46F5LLzQMvFOmKGYzC-5cjAmtxk1ZC5OD6aA57-YGUlCK27n1CzW7XB9SX772t06YTHOV0Lj0NFKqasdPC7bzASzcLgU7Xvtyootnbs76wepDcPuXUS0iAiDixuZS9zuEjYh7OLk5BIyG7ZAhVPK5G4yxR8Ev0Lnf0JLjaijEBL9UzWTdfpZlBMjw-9o0RR4tzxziyBP54dFY78NNpUCZm-awK8IMIFs8Ww/p.jpeg'
    },
    {
      name: 'Producto 4',
      description: 'Descripción del producto 4',
      price: 432,
      image: 'https://uc8b4f0898ee9764d65677c11220.previews.dropboxusercontent.com/p/thumb/ACnOvV-caMfVgeCZtYVhAaEyFKM2sfj2yaK502npbCGam6wrJonawmcJoN5EA9FQHawVJbUtbTQrEeYSqEppCnve5TSk4Tag3921Inno7jXphk0jc9eguB7JpWIHeCvv5DkPpBiV54VcMY0y37EWPi3r_gkXFQZmEzsawMSB2EpMK9P-Jttb15pIfhobFpujf64E4NNB9-jKp3tbfcCC8_lf2e1t7TGUAhe8Cz6RMCVXc08kqhMUpph5akavpTiZgf7E1dtxDK7DqQpshHoux03GhFVB99dHM7iFU9t7wzJsN0XNG7WwQ7yM4R2q8UppUrhOv9msoHEjvGBP50GO3rZ2ExGXOLiclPGduqJZBtCpiKs4CBvfiUq5UoiI2cfRzp7qxNaiStYT2CyYFYKlj1wer1jBWczCIkzluugkUyxO3ipZHiVFtQmaPTNedw3tYrPhcUWz3sPaNnN1hDifnfVtmsYg6iIt2PPAgWbr8GAyM1YFhCLQrgxN_cNeQ_Oo-If3tCOGBRpvu0acdLMs4_939--TqL7zDENJ_gJ7ME1jjFYK5BrR12ZwJAxa-XYTnzWZtjTQnwPzixA73ClI6T-EeuftfltQbj79ITGI4upp9FJn178sGTFSufF0ARedxp9M5o69C0eEgy_FX7NDi8tkDLmU3Jkq07CJ23GawPqIBhXy22SZ2iBuU_J0HeOVpmJ7nU_Kae84T9-KtUB7sBM6/p.jpeg'
    },
    {
      name: 'Producto 5',
      description: 'Descripción del producto 5',
      price: 987,
      image: 'https://uce0f0c86393f3efd380b447b1e5.previews.dropboxusercontent.com/p/thumb/ACmLxWr6IEz6wWwLkO304eHJW3ksHz78GS38ZuofC9x4tEfHJy9Jz8X7VsHpZQoHmAFBZp4s_2cgQ1oA_7OswTuJpeybTb0hh1P6YEwGE2Q4AoU0ndyWonyRv2sDcPFfcT3NMdrRtiF_7rfGNnZIs5WG29OHIugsxjRZJzVQ2Sg19QwYSnoPA54trMDp3kRqIUmW1U9RUN3hZu8BEAnLEmbsE_P1Dmnq1bQ_C7MiLjAD9bHR4VTSWh-GJ27TnsLYT2n7mokUn0ramSeBqoalfIclwHSQVDk6gKIHJMz2VrCsFwIJFJm0RshM5eRwcheU74BO0a3IRJwiC7PamxB4F6rkJ_rthCqZHrQ_OkokF4fntG-VWG_gnMJBrkEBJ9__I13hdET-ZbiEpGC8esu9bjJLMbEy1XYUXgERzqWMCdUL036joWGfSfSL_VSh_4m1LTFBOrdNLi0frO20aoPKXd_VzOzDb592UWTyyPzjbTxcK9udsDyCR0wFt_QZlQad4pOHZZ1zP6z2p5iLEAFJGbo4n86YFcLKZIsOS5ArtnSOdS26ede7CSCfS8RWa82h73BLspCQLDXoPFJ0Easkjqbkr7fcbPm0eP8niBxgxqOvEw/p.jpeg'
    },
    {
      name: 'Producto 6',
      description: 'Descripción del producto 6',
      price: 234,
      image: 'https://uc7fd31d65232618df6f6067e78e.previews.dropboxusercontent.com/p/thumb/ACl188lwbMQVmDWC4Ai7oMOpa79wWFnDSs9JqY2kZ8HIVxyM7_6PqLHS_pDOwZURSWuj2qBsgVP2j9_4GHJUZlNGUY8zlSKMIe1nFgkbHtDkDApcFFf4VIPm8PoBcJirxW9_KvQ_A1lWkKuypmP2Ao4MuUqlXTRwBbLsaeMlITpuBHpWsvatMLtfiF1WCYRxIFIUEI4ePCoXaXD4uBEQ95Do8aUM_WJYLPeISDWPJlJqDVD7L0v8ngXXxkCngD2ChMvfFMDgl0V8E1YDEpSjkvOXXNl0hjCz6pV0kyHBf2rZgZokLkktcaR8xXnfo7bTmEdkkBm4XX6UowXKIRuHDUgvIGCibUanTJaDdIGoEBRzu1Aj3n_GelnhVOR7UyMczWfzwE0sYr40eublttf_5S5NNrhrXGkyBF1QMzT5D9ylXcTxKXUQMZY1slxjmZCzshGi-RqoIE5U-gYgCPLnw1Vb3vO68CQDPtEtb7Wlw1jpBChCmSdy9ofhXnUAli-OAGOndZHksbmA2lYc1stWUyFSIQ4JFWimwVfwl3NXXwCGYyq4-i9to1SdDIToJd3L6BqJP93fzDlPeM8VBbkCb6ZsVvdcHESQan02xP43dfEacNvr9ZGNXuJUTZSBT9-mRominfdvzw_AklWurMsYhGdnXGHVFAOphaorUsa6MS9LXg7d8g3jMmK7gz_OB2gwUIDtQemM5uf5jrJUldxko5pp8RI7Uprz5Y1YUtc57kFSrcNWazduOadPf26d2q3Z-06ysvlvVg2USl0FCEl1biVJSn_txagZvUmoojOJWx2Qp42nafzxVk1rnDtWK3u5_rQCX9eMLBgaURh70SJq3RkQj_5SFxlDIwHlc4cR-KwugUF8QIGmOfBeRNCAx3zbr0ZF2EmdzdHA_oCOAVm778svhDjmpv34r-cFJP2Mlb-4AudWuP2bDx_K_rT4JQmpJjhsliUzGOTteNbmZ-o6DQXUPIO8oHl3f-vpmmtsnZVWX-_9M0QlUgSZ9rYzGsEVCZ7uWQwatKKG9FW48LOVKM242TYTybiAavJskTjsJOqaNn8frIfO8fjnzaE3jpv6Up8/p.jpeg'
    },
  ];

}
