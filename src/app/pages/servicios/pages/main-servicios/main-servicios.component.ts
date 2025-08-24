import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { TipoServicioComponent } from '../../components/tipo-servicio/tipo-servicio.component';
import { ServiciosProfesionalesService } from '../../../../core/services/servicios-profesionales.service';
import { RootObjectServicios } from '../../../../core/models/servicios-profesionales.model';
import { FiltrosServiciosProfesionalesComponent } from '../../components/filtros/filtros.component';
import { BlogService } from '../../../../core/services/blog.service';
import { CategoryArticleModel, FiltersArticle } from '../../../../core/models/article-blog.model';
import { ListAliadosComponent } from '../../components/list-aliados/list-aliados.component';

const dataServiciosDummy: RootObjectServicios = {
  secciones: null
}

@Component({
  selector: 'app-main-servicios',
  standalone: true,
  imports: [
    TipoServicioComponent,
    FiltrosServiciosProfesionalesComponent,
    ListAliadosComponent
  ],
  templateUrl: './main-servicios.component.html',
})

export class MainServiciosComponent implements OnInit {

  private readonly serviciosProfesionalesService = inject(ServiciosProfesionalesService);
  private readonly blogService = inject(BlogService);
  private readonly cdr = inject(ChangeDetectorRef);

  public dataServicios = signal<RootObjectServicios>(dataServiciosDummy);
  public categoriesList = signal<CategoryArticleModel[]>([]);
  // public articles = signal<ArticleModel[]>([]);
  public page = signal<number>(1);
  public perPage = signal<number>(10);
  public totalColaboraciones = signal<number>(0);
  public filters = signal<FiltersArticle>({
    page: this.page(),
    per_page: this.perPage(),
    category: '',
    search: ''
  });

  ngOnInit(): void {
    this.getDataServiciosProfesionales();
    this.getCategories();
  }

  getDataServiciosProfesionales() {
    this.serviciosProfesionalesService.getDataServiciosProfesionales().subscribe({
      next: response => {
        if(!response.secciones) return;
        this.dataServicios.set(response);
      },
      error: error => console.error(error)
    })
  }


  getCategories() {
    this.blogService.getCategories().subscribe({
      next: response => {
        this.categoriesList.set(response);
        this.cdr.detectChanges(); // <- Solución
      }
    });
  }

  onFilterChanged(data: { search: string; category: string }) {
    console.log(data);
    this.page.set(1);
    this.filters.update(currencyValue => {
      return {
        ...data,
        per_page: this.perPage(),
        page: this.page()
      }
    });
    // this.getAllArticles();
  }

}
