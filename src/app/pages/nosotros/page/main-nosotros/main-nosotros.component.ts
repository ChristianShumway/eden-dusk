import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CronologiaComponent } from '../../components/cronologia/cronologia.component';
import { GaleriaCronologiaComponent } from '../../components/galeria-cronologia/galeria-cronologia.component';
import { PremiosDistincionesComponent } from '../../components/premios-distinciones/premios-distinciones.component';
import {  ColaboracionesAlianzasComponent } from '../../components/colaboraciones-alianzas/colaboraciones-alianzas.component';

@Component({
  selector: 'app-main-nosotros',
  standalone: true,
  imports: [
    LayoutComponent,
    CronologiaComponent,
    GaleriaCronologiaComponent,
    PremiosDistincionesComponent,
    ColaboracionesAlianzasComponent
  ],
  templateUrl: './main-nosotros.component.html',
  styleUrl: './main-nosotros.component.scss'
})
export class MainNosotrosComponent {


}
