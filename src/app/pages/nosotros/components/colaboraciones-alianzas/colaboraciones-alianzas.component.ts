import { ChangeDetectorRef, Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { SvgService } from '../../../../core/services/svg.service';
import { FiltrosColaboracionesComponent } from '../filtros-colaboraciones/filtros-colaboraciones.component';
import { AlianzasModel, CategoriasAlianzas, FiltersAlianzas } from '../../../../core/models/colaboraciones-alianzas.model';
import { TrayectoriaService } from '../../../../core/services/trayectoria.service';
import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';
@Component({
  selector: 'nosotros-colaboraciones-alianzas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    FiltrosColaboracionesComponent,
    NoDataComponent
  ],
  templateUrl: './colaboraciones-alianzas.component.html',
})

export class ColaboracionesAlianzasComponent implements OnInit {

  private readonly svgService = inject(SvgService);
  private readonly trayectoriaService = inject(TrayectoriaService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  public categorias = input.required<CategoriasAlianzas[]>();

  public svgArrow = this.svgService.getSanitizedSvg(SvgIcons.angleRight);

  public alianzas = signal<AlianzasModel[]>([]);
  public page = signal<number>(1);
  public perPage = signal<number>(10);
  public totalAlianzas = signal<number>(0);
  public filters = signal<FiltersAlianzas>({
    page: this.page(),
    per_page: this.perPage(),
  });

  public msg = 'No hay colaboraciones/alianzas disponibles para esta categoría.'


  ngOnInit(): void {
    this.getDataAlianzas();
  }

  getDataAlianzas(page?: number) {
    this.filters.update( currencyValue => {
      return {
        ...currencyValue,
        page: page ? page : this.page()
      }
    });
    this.page.set(page ? page : this.page());

    this.trayectoriaService.getAlianzas(this.filters()).subscribe({
      next: response => {
        if(!response.data) return;
        console.log(response);
        this.alianzas.set(response.data);
        this.totalAlianzas.set(Number(response.total));
      },
      error: error => console.error(error)
    })
  }

  pageChanged(e: number) {
    this.getDataAlianzas(e);
  }

  onFilterChanged(data: { search: string; category: string }) {
    this.page.set(1);
    this.filters.update(currencyValue => {
      return {
        ...data,
        per_page: this.perPage(),
        page: this.page()
      }
    });
    this.getDataAlianzas();
  }

  goToContacto() {
    this.router.navigateByUrl('/contacto');
  }

}
