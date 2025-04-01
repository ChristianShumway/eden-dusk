import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { QuienEsEdenDuskComponent } from '../../components/quien-es-eden-dusk/quien-es-eden-dusk.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutComponent,
    QuienEsEdenDuskComponent
  ],
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss'
})
export class HomeComponent {

}
