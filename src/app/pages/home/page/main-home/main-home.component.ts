import { Component, inject, OnInit, signal } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { QuienEsEdenDuskComponent } from '../../components/quien-es-eden-dusk/quien-es-eden-dusk.component';
import { PreviewPortfolioComponent } from '../../components/preview-portfolio/preview-portfolio.component';
import { PreviewStoreComponent } from '../../components/preview-store/preview-store.component';
import { NovedadesComponent } from '../../components/novedades/novedades.component';
import { NewsLetterComponent } from '../../components/news-letter/news-letter.component';
import { EventosTransmisionesComponent } from '../../components/eventos-transmisiones/eventos-transmisiones.component';
import { TransmisionModel } from '../../../../core/models/transmission.model';
import { TransmisionesService } from '../../../../core/services/transmisiones.service';
import { GalleryService } from '../../../../core/services/galeria.service';
import { FiltersGallery, ImageGalleryModel } from '../../../../core/models/filters-gallery.model';
import { ProductsService } from '../../../../core/services/products.service';
import { FiltersProducts, ProductModel } from '../../../../core/models/products.model';
import { RootObjectHome } from '../../../../core/models/home.model';

const dataHomeDummy: RootObjectHome = {
  secciones: null
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutComponent,
    QuienEsEdenDuskComponent,
    PreviewPortfolioComponent,
    PreviewStoreComponent,
    NovedadesComponent,
    NewsLetterComponent,
    EventosTransmisionesComponent
  ],
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss'
})

export class HomeComponent implements OnInit {

  private readonly transmisionesService = inject(TransmisionesService);
  private readonly galleryService = inject(GalleryService);
  private readonly productService = inject(ProductsService);

  public imagesList = signal<ImageGalleryModel[]>([]);
  public productList = signal<ProductModel[]>([]);
  public seccionesHome = signal<RootObjectHome>(dataHomeDummy);


  public eventos = signal<TransmisionModel[]>([]);
  public eventosPasados = signal<TransmisionModel[]>([]);
  public dateToSearh = new Date();

  public filters = signal<FiltersGallery>({
    page: 1,
    per_page: 3,
    category: '',
    subcategory: '',
    search: '',
    date: '',
    collaborator: 0
  });

  public filtersProducst = signal<FiltersProducts>({
    page: 1,
    per_page: 12,
    order: 'default'
  });

  ngOnInit(): void {
    this.getDataHome();
    this.getGalleries();
    this.getProducts();
    this.getAllTransmissions(this.dateToSearh);
    this.getLastTransmissions();
  }

  getDataHome() {
    this.transmisionesService.getDataHome().subscribe({
      next: response => {
        if(!response.secciones) return;
        console.log(response);
        this.seccionesHome.set(response);
      },
      error: error => console.error(error)
    })
  }

  getGalleries() {
    this.galleryService.getImagesGallery(this.filters()).subscribe({
      next: response => this.imagesList.set(response.data),
      error: error => console.error(error)
    })
  }

  getProducts() {
    this.productService.getAllProducts(this.filtersProducst()).subscribe({
      next: response => {
        this.productList.set(response.data);
      },
      error: err => console.error(err)
    })
  }


  getAllTransmissions(date: Date) {
    this.transmisionesService.getAllTransmissions().subscribe({
      next: response => {
        this.eventos.set([...response]);
      },
      error: error => console.error(error)
    })
  }

  getLastTransmissions() {
    this.transmisionesService.getLastTransmissions().subscribe({
      next: response => {
        this.eventosPasados.set([...response]);
      },
      error: error => console.error(error)
    })
  }

}
