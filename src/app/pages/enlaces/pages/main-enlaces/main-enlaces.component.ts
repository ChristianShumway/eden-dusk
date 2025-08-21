import { Component } from '@angular/core';
import { EnlacesComponent } from '../../components/enlaces/enlaces.component';

@Component({
  selector: 'app-main-enlaces',
  standalone: true,
  imports: [
    EnlacesComponent
  ],
  templateUrl: './main-enlaces.component.html',
  styleUrl: './main-enlaces.component.scss'
})
export class MainEnlacesComponent {

}
