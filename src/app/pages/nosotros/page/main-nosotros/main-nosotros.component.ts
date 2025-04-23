import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CronologiaComponent } from '../../components/cronologia/cronologia.component';
import { GaleriaCronologiaComponent } from '../../components/galeria-cronologia/galeria-cronologia.component';

@Component({
  selector: 'app-main-nosotros',
  standalone: true,
  imports: [
    LayoutComponent,
    CronologiaComponent,
    GaleriaCronologiaComponent
  ],
  templateUrl: './main-nosotros.component.html',
  styleUrl: './main-nosotros.component.scss'
})
export class MainNosotrosComponent {


}
