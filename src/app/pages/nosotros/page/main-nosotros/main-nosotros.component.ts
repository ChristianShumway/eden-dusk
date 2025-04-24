import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CronologiaComponent } from '../../components/cronologia/cronologia.component';
import { GaleriaCronologiaComponent } from '../../components/galeria-cronologia/galeria-cronologia.component';
import { PremiosDistincionesComponent } from '../../components/premios-distinciones/premios-distinciones.component';
import { ProyeccionAgradecimientosComponent } from '../../components/proyeccion-agradecimientos/proyeccion-agradecimientos.component';

@Component({
  selector: 'app-main-nosotros',
  standalone: true,
  imports: [
    LayoutComponent,
    CronologiaComponent,
    GaleriaCronologiaComponent,
    PremiosDistincionesComponent,
    ProyeccionAgradecimientosComponent
  ],
  templateUrl: './main-nosotros.component.html',
  styleUrl: './main-nosotros.component.scss'
})
export class MainNosotrosComponent {


}
