import { Component } from '@angular/core';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { ItemLayoutModel } from '../../../../core/models/item-layout.model';

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

  public urlImageBackground: string = 'https://ucf7022c257225157fde3696c4ae.previews.dropboxusercontent.com/p/thumb/ACmfYnoWy5AvaMN_xUINpPjgr4uoV3F5EQV_m_m4_7lDzvHZwnqMU60aOOychZHjV-CW0tSjdl_NUIfHoKxajeO1GmXL4DshJ7UdFTxenYsslIiVHX2AKQt1YshpRhvTR3a387cgVWp8Cs9z-pBlkUVYE7f6T-kXt1607kgRwg-jTqgBnok9in1pc8x3dpYd-ORQc1fLYpoPF3oohxNFhi-Nwt414NvRq2E-MaN72kQLg504lBUsIP2j-6v2ZOuL2d_wXUHWpYXo1Cb440nSyxS-Q5bEM_RCznhE2dSKlkXeNswdfWKITYCYgRNYn4Pvz0-W5d5zeXo6YUJufbGTsj1UgayxQoX0m5phBU2u12_LllOASJjUr8u1H_R017ekA-lAlGoM05UupXmiEI85JT14DuqBXX1dxutBtOsUh0E3kN3T1mFz4wqlMRJb3bmCClhtfmpIUa3zv4SRmjueRtDtz7QcQSZcplQtqnmCcbN4uhMM5dbGLuxKORT6ce_UyzQz7Khfyw14hu4BIm22u8O5c8uN_Jav4dPDxhG5_xJiceXDNywZOFOtKkrJ_kYUg0ZeuM1gaAr0YO-PVGj7b9hFs0uS6vblLOQv0r_CPbANPrYoWGLGg-NBdDIiCAgnrSYBRfJxaA-ie7aQeWt32NNN/p.jpeg';

  public itemsLayout: ItemLayoutModel[] = [
    {
      text: 'Texto muestra',
      url: 'https://uc562c143168927d552dcb10708d.previews.dropboxusercontent.com/p/thumb/AClIMzfbHz4vlihOqikjPQNwcgwIASREYV2zkw0fpyYWxB5KQI4P71wkZRS-nCKqkmhLzS24PItNaBjzjriOuc4Uydw0wCtWG5y3HP5j5B7-OU9CL-jLMo0tUgSuWBfswVP1AjszQY0pin3RLEqAzXQXgCF1v1STYIhQU_3fDfpPVH-mKSmwjnQb2WqAqfbpW4LGx9eRTdrgEzqM5rUxeoQP0ehAy6DsovtC1XvkmJRaemPj5x1jGX9PYVy3Yu-09F_X6APCIpa3fCkrnCZNZxTP6M0PaPJgDCQr3Ay1XexqgedEKM7t0O4P-ZukYZi3ct-74zY-ZfTpqw4HnlOEhWVphv0LF6-Jf1Ie_mT97WkFm0KL3WLJAQD4-pfcrTQEdK0s_6gk1QVIJTfSYrIk_MvVO-tNKp2ple0-GIeeIaUUnILLB502S19jvNTsVZKoJp7PTbUYrMrDwEbTf4vYPf1BF3ORSYijAL-UrBQRBXqv1gaQcOKikrE_eb89Kf22Esn5ygKhGsaKvy6vbxmhKX7xkvgmuH0Vd49mTchfpvCKBCtRYpF9t0UuCeF0IpfhSuA-54teHdhiKZJPCeu3BP8qf-iH8m3dCo1xK4gwFhHH-g/p.jpeg',
      visible: true
    },
    {
      text: 'Texto muestra',
      url: 'https://uc827a7d32cc5bcb4aa709a8ce4b.previews.dropboxusercontent.com/p/thumb/AClSVkNIYtKihAh0eyej-Fegal8iTijPK9BygyL88PhwPx4lmUycRGB0Tx2EDk-Wxiumy4_2DmERLfxEPer4m54ssHEefpwcU7OdxIAQvvvwsau3JG7va8mcFXwKBFQuzrjUrmnNC14hcBP1LfYIyS9_ZtDfNGb8AhTWWb1aZm_Tkl8qZ0v-ehD4ociGhE2jTXVMwqrarCSDPqCPzgcDjowGgothxpC41df6vpt7uWafrA4R8nKYAVCh-N07ndRHQ-HLUBATUDxAhnKnpPl4BaDD9eBvoDUBJLmRk53Q6CwTz5kPONLVtPbGulwCdpf1cpgP3p8IxZUfNWbSdSdc58Yax8H3a4FmuAj0HmK63gFPXXejTCWqO5eZHfky3pSBnJBVhi0vfQscZ4nAc9ptEUwHTGWhBmIIlPFAHz2YGckfslgtmcQV90cNBQ9y8TroKgOBw_4sgf2fKB9EK7dbSouyarjSzLEAxDEtJsYgJSuP-_00IR9geDZs7fyt1p2ZIHikx-STul7yFMD1EZl0C5CoGMCg0Cb10yOciwCJwB-0FPyivazqhoWNgr3Fj-OvwqI6x5tgvrptlQYZe50qxWrKNUSvWsOMJAPN56OFOIyDPwETi01KBEqoujKaTCFy_jF4GlhX77XLCt8BTWUrtDJnnl74m86mO-72yCqfRcjkuF3luYpluJfRO16ggyLIk9as54ylsjgE_wso2B4yAiTV/p.jpeg',
      visible: true
    },
    {
      text: 'Texto muestra',
      url: 'https://ucb5f4b51ab52d6811bc0f4e4d7a.previews.dropboxusercontent.com/p/thumb/ACm7HmMt-BrijkQ90f7TUI81SLPRJdEzVMuWGC6fbt-6cv0Up2HryT9c6nTdTgBrJrvIjbzNjiBrrXUeGyqr3g-QyabgC-s1iCG6KtG2wqnAZggV_ktH01Otyh6_3KbFy4MEPgJk1RzKFU7Oow8v85yyjfHuu1ixKQ36e4_Z7wdIq3H45qoC7ZwBt-EART_3K1FXg5lYLSXjIsOvyjyf_G3ENKVf9a-Yz9W1krUlChIaH0fl0WnXNjLr-EUbb1h19Z0u_gVHZKGsrtVWjCCxl5TfKm1S0G4wbaPxaCICwXtx1FJJfcYDjS213NwcLr7DamZZze6GNImJG4kFdcI49Ei17xS-LAAM4zDyGkCtWHZOGdMrpxRjEq0rZZOqkUr8y6ZK5zNURnDhDODzdJFvTTQ0seUkGZoka1vLMD6-eqjIvc2VhZUTt3diJKKLCeo3OyEctDyJiYTmaWonEQYTBmxZgyrRgBmMQcDJBCoeHTqxdYBSsPoNWPrVfpq5JSdA5eMETnBR2LYLGRj9D2KtRNxWgfGqVl6Trfmxphv-uXkthHOfEHGhI358VmL3DH5_8m1cvYf2qcksfJaaaWgDLfsN7bpQrbycvbaEf1VmyjVLvQ/p.jpeg',
      visible: true
    }
  ];

}
