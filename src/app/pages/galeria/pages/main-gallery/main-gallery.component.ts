import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { ColeccionComponent } from '../../components/coleccion/coleccion.component';
import { GalleryService } from '../../../../core/services/galeria.service';
import { CategoryGalleryModel, CollaboratorGalleryModel, FiltersGallery } from '../../../../core/models/filters-gallery.model';

@Component({
  selector: 'app-main-gallery',
  standalone: true,
  imports: [
    LayoutComponent,
    FiltrosComponent,
    ColeccionComponent,
  ],
  templateUrl: './main-gallery.component.html',
  styleUrl: './main-gallery.component.scss'
})

export class MainGalleryComponent implements OnInit {

  private readonly blogService = inject(GalleryService);
  private readonly cdr = inject(ChangeDetectorRef);

  public categoriesList = signal<CategoryGalleryModel[]>([]);
  public collaboratorsList = signal<CollaboratorGalleryModel[]>([]);

  ngOnInit(): void {
    this.getCategories();
    this.getCollaborators();
  }

  getCategories() {
    this.blogService.getCategories().subscribe({
      next: response => {
        this.categoriesList.set(response);
        this.cdr.detectChanges(); // <- Solución
      }
    });
  }

  getCollaborators() {
    this.blogService.getCollaborators().subscribe({
      next: response => {
        this.collaboratorsList.set(response);
        this.cdr.detectChanges(); // <- Solución
      }
    });
  }

  onFilterChanged(data: FiltersGallery) {
    console.log(data);
  }

}
