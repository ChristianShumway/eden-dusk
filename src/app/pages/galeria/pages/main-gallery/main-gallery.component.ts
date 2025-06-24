import { ChangeDetectorRef, Component, computed, inject, OnInit, signal } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { LayoutComponent } from '../../components/layout/layout.component';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { ColeccionComponent } from '../../components/coleccion/coleccion.component';
import { GalleryService } from '../../../../core/services/galeria.service';
import {
  CategoryGalleryModel,
  CollaboratorGalleryModel,
  FiltersGallery,
  ImageGalleryModel
} from '../../../../core/models/filters-gallery.model';

@Component({
  selector: 'app-main-gallery',
  standalone: true,
  imports: [
    NgxPaginationModule,
    LayoutComponent,
    FiltrosComponent,
    ColeccionComponent,
  ],
  templateUrl: './main-gallery.component.html',
  styleUrl: './main-gallery.component.scss'
})

export class MainGalleryComponent implements OnInit {

  private readonly galleryService = inject(GalleryService);
  private readonly cdr = inject(ChangeDetectorRef);

  public categoriesList = signal<CategoryGalleryModel[]>([]);
  public collaboratorsList = signal<CollaboratorGalleryModel[]>([]);
  public imagesList = signal<ImageGalleryModel[]>([]);
  public groupedGridGallery = computed(() => this.groupArrayInChunks(this.imagesList(), 3));

  public page = signal<number>(1);
  public perPage = signal<number>(12);
  public totalItems = signal<number>(0);
  public filters = signal<FiltersGallery>({
    page: this.page(),
    per_page: this.perPage(),
    category: '',
    subcategory: '',
    search: '',
    date: '',
    collaborator: 0
  });

  ngOnInit(): void {
    this.getCategories();
    this.getCollaborators();
    this.getImagesGallery();
  }

  getCategories() {
    this.galleryService.getCategories().subscribe({
      next: response => {
        this.categoriesList.set(response);
        this.cdr.detectChanges(); // <- Solución
      }
    });
  }

  getCollaborators() {
    this.galleryService.getCollaborators().subscribe({
      next: response => {
        this.collaboratorsList.set(response);
        this.cdr.detectChanges(); // <- Solución
      }
    });
  }

  getImagesGallery(page?: number) {
    this.filters.update( currencyValue => {
      return {
        ...currencyValue,
        page: page ? page : this.page()
      }
    });
    this.page.set(page ? page : this.page());
    this.galleryService.getImagesGallery(this.filters()).subscribe({
      next: response => {
        this.imagesList.set(response.data);
        this.totalItems.set(parseInt(response.total))
      }
    })
  }

  groupArrayInChunks(arr: ImageGalleryModel[], chunkSize: number): ImageGalleryModel[][] {
  const grouped: ImageGalleryModel[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    grouped.push(arr.slice(i, i + chunkSize));
  }
  return grouped;
  }

  onFilterChanged(data: FiltersGallery) {
    this.page.set(1);
    this.filters.update(() => {
      return {
        ...data,
        per_page: this.perPage(),
        page: this.page()
      }
    });
    this.getImagesGallery();
  }

  pageChanged(e: number) {
    this.getImagesGallery(e);
  }

}
