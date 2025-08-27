import { Component, inject, OnInit, signal } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CronologiaComponent } from '../../components/cronologia/cronologia.component';
import { GaleriaCronologiaComponent } from '../../components/galeria-cronologia/galeria-cronologia.component';
import { PremiosDistincionesComponent } from '../../components/premios-distinciones/premios-distinciones.component';
import {  ColaboracionesAlianzasComponent } from '../../components/colaboraciones-alianzas/colaboraciones-alianzas.component';
import { TrayectoriaService } from '../../../../core/services/trayectoria.service';
import { TrayectoriaDataModel } from '../../../../core/models/trayectoria.model';
import { CoberturaMediosModel, FiltersCobertura } from '../../../../core/models/cobertura-medios.model';
import { CategoriasAlianzas } from '../../../../core/models/colaboraciones-alianzas.model';

@Component({
  selector: 'app-main-nosotros',
  standalone: true,
  imports: [
    NgxPaginationModule,
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
  public coberturas = signal<CoberturaMediosModel[]>([]);
  public categorias = signal<CategoriasAlianzas[]>([]);
  public pageCobertura = signal<number>(1);
  public perPage = signal<number>(10);
  public totalItems = signal<number>(0);
  public filters = signal<FiltersCobertura>({
    page: this.pageCobertura(),
    per_page: this.perPage()
  });

  ngOnInit(): void {
    this.getData();
    this.getDataCobertura();
    this.getCategoriasAlianzas();
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

  getDataCobertura(page?: number) {
    this.filters.update( currencyValue => {
      return {
        ...currencyValue,
        page: page ? page : this.pageCobertura()
      }
    });
    this.pageCobertura.set(page ? page : this.pageCobertura());

    this.trayectoriaService.getCoberturaMedios(this.filters()).subscribe({
      next: response => {
        if(!response.data) return;
        console.log(response);
        this.coberturas.set(response.data);
        this.totalItems.set(Number(response.total));
      },
      error: error => console.error(error)
    })
  }

  pageCoberturaChanged(e: number) {
    this.getDataCobertura(e);
  }

  getCategoriasAlianzas() {
    this.trayectoriaService.getCategoriasAlianzas().subscribe({
      next: response => {
        if(!response) return;
        this.categorias.set(response);
      },
      error: error => console.error(error)
    })
  }

}
