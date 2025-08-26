import { Component, inject, OnInit, signal } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CronologiaComponent } from '../../components/cronologia/cronologia.component';
import { GaleriaCronologiaComponent } from '../../components/galeria-cronologia/galeria-cronologia.component';
import { PremiosDistincionesComponent } from '../../components/premios-distinciones/premios-distinciones.component';
import {  ColaboracionesAlianzasComponent } from '../../components/colaboraciones-alianzas/colaboraciones-alianzas.component';
import { TrayectoriaService } from '../../../../core/services/trayectoria.service';
import { RootObjectTrayectoria, TrayectoriaDataModel } from '../../../../core/models/trayectoria.model';

const dataDummy: RootObjectTrayectoria = {
  secciones: null
}
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
export class MainNosotrosComponent implements OnInit {

  private readonly trayectoriaService = inject(TrayectoriaService);
  public dataTrayectoria = signal<TrayectoriaDataModel | null>(null);

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.trayectoriaService.getDataTrayectoria().subscribe({
      next: response => {
        if(!response) return;
        console.log(response);
        this.dataTrayectoria.set(response);
      },
      error: error => console.error(error)
    })
  }



}
