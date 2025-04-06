import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { QuienEsEdenDuskComponent } from '../../components/quien-es-eden-dusk/quien-es-eden-dusk.component';
import { PreviewPortfolioComponent } from '../../components/preview-portfolio/preview-portfolio.component';
import { PreviewStoreComponent } from '../../components/preview-store/preview-store.component';
import { NovedadesComponent } from '../../components/novedades/novedades.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutComponent,
    QuienEsEdenDuskComponent,
    PreviewPortfolioComponent,
    PreviewStoreComponent,
    NovedadesComponent
  ],
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss'
})
export class HomeComponent {

}
