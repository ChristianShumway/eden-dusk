import { Component } from '@angular/core';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { EventosProximosComponent } from '../../components/eventos-proximos/eventos-proximos.component';
import { EventosPasadosComponent } from '../../components/eventos-pasados/eventos-pasados.component';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';

@Component({
  selector: 'app-main-transmisiones',
  standalone: true,
  imports: [
    FiltrosComponent,
    EventosProximosComponent,
    EventosPasadosComponent,
    BackgroundImagePipe
  ],
  templateUrl: './main-transmisiones.component.html',
  styleUrl: './main-transmisiones.component.scss'
})

export class MainTransmisionesComponent {

  public urlImageBackground: string = 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

}
