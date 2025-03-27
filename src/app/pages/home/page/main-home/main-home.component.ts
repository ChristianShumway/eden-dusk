import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutComponent
  ],
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss'
})
export class HomeComponent {

}
