import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { VideotecaService } from '../../../../core/services/videoteca.service';
import { CategoryVideotecaModel, FiltersVideoteca, VideotecaModel } from '../../../../core/models/videoteca.model';
import { ColeccionVideotecaComponent } from '../../components/coleccion-videoteca/coleccion-videoteca.component';
@Component({
  selector: 'app-main-videoteca',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    LayoutComponent,
    FiltrosComponent,
    ColeccionVideotecaComponent
  ],
  templateUrl: './main-videoteca.component.html',
  styleUrl: './main-videoteca.component.scss'
})

export class MainVideotecaComponent implements OnInit {

  private readonly videoService = inject(VideotecaService);
  private readonly cdr = inject(ChangeDetectorRef);

  public categoriesList = signal<CategoryVideotecaModel[]>([]);
  public videoList = signal<VideotecaModel[]>([]);
  public page = signal<number>(1);
  public perPage = signal<number>(10);
  public totalVideos = signal<number>(0);
  public filters = signal<FiltersVideoteca>({
    page: this.page(),
    per_page: this.perPage(),
    category: '',
  });

  ngOnInit(): void {
    this.getCategories();
    this.getAllVideos();
  }

  getCategories() {
    this.videoService.getCategories().subscribe({
      next: response => {
        this.categoriesList.set(response);
        this.cdr.detectChanges(); // <- Solución
      }
    });
  }

  getAllVideos(page?: number) {
    this.filters.update( currencyValue => {
      return {
        ...currencyValue,
        page: page ? page : this.page()
      }
    });
    this.page.set(page ? page : this.page());
    this.videoService.getAllVideosDummy(this.filters()).subscribe({
      next: response => {
        console.log(response);
        this.videoList.set(response);
        this.totalVideos.set(response.length);
      },
      error: err => console.error(err)
    })
  }

  pageChanged(e: number) {
    this.getAllVideos(e);
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
    this.getAllVideos();
  }

}
