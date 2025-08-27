import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { ColeccionProyectosComponent } from '../../components/coleccion-proyectos/coleccion-proyectos.component';
import { ProyectoService } from '../../../../core/services/proyecto.service';
import { CategoryProyectoModel, FiltersProyectos, ProyectoModel } from '../../../../core/models/proyecto.model';

@Component({
  selector: 'app-main-proyectos',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    FiltrosComponent,
    ColeccionProyectosComponent
  ],
  templateUrl: './main-proyectos.component.html',
  styleUrl: './main-proyectos.component.scss'
})

export class MainProyectosComponent implements OnInit {

  private readonly proyectoService = inject(ProyectoService);
  private readonly cdr = inject(ChangeDetectorRef);

  public categoriesList = signal<CategoryProyectoModel[]>([]);
  public projectList = signal<ProyectoModel[]>([]);
  public page = signal<number>(1);
  public perPage = signal<number>(10);
  public totalProjects = signal<number>(0);
  public filters = signal<FiltersProyectos>({
    page: this.page(),
    per_page: this.perPage(),
    category: '',
    search: ''
  });

  ngOnInit(): void {
    this.getCategories();
    this.getAllProjects();
  }

  getCategories() {
    this.proyectoService.getCategories().subscribe({
      next: response => {
        this.categoriesList.set(response);
        this.cdr.detectChanges();
      }
    });
  }

  getAllProjects(page?: number) {
    this.filters.update( currencyValue => {
      return {
        ...currencyValue,
        page: page ? page : this.page()
      }
    });
    this.page.set(page ? page : this.page());
    this.proyectoService.getAllProjects(this.filters()).subscribe({
      next: response => {
        console.log(response);
        this.projectList.set(response.data);
        this.totalProjects.set(response.data.length);
      },
      error: err => console.error(err)
    })
  }

  pageChanged(e: number) {
    this.getAllProjects(e);
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
    this.getAllProjects();
  }

}
