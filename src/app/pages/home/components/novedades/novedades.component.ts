import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'home-novedades',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.scss'
})
export class NovedadesComponent {

  fechaHoy = new Date;

}
