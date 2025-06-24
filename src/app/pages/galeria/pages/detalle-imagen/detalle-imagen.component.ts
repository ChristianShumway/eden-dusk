import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { GalleryService } from '../../../../core/services/galeria.service';
import { BtnReturnComponent } from '../../../../shared/components/btn-return/btn-return.component';
import { ImageGalleryModel } from '../../../../core/models/filters-gallery.model';
import { ProtectImageDirective } from '../../../../core/directives/protect-images.directive';
import { ImageOverlayComponent } from '../../../../shared/components/image-overlay/image-overlay.component';
import { AlertFloatComponent } from '../../../../shared/components/alert-float/alert-float.component';
import { AlertRemovableComponent } from '../../../../shared/components/alert-removable/alert-removable.component';

@Component({
  selector: 'app-detalle-imagen',
  standalone: true,
  imports: [
    CommonModule,
    BtnReturnComponent,
    ImageOverlayComponent,
    AlertFloatComponent,
    AlertRemovableComponent,
    ProtectImageDirective
  ],
  templateUrl: './detalle-imagen.component.html',
  styleUrl: './detalle-imagen.component.scss'
})

export class DetalleImagenComponent implements OnInit {

  private readonly ar = inject(ActivatedRoute);
  private readonly galleryService = inject(GalleryService);

  public currencyImage!: ImageGalleryModel; // Llénalo desde un endpoint o dummy
  public category = signal<string | null>(null);
  public idGallery = signal<number>(0);
  public currencyUrlImage = signal<string>('');
  public hasPreviousPage = signal<boolean>(false);
  public hasNextPage = signal<boolean>(false);
  public previousPage = signal<number | null>(null);
  public nextPage = signal<number | null>(null);
  public alertMsg = 'Esta imagen está protegida por derechos de autor';

  ngOnInit(): void {
    this.initParams();
  }

  initParams() {

    this.ar.paramMap.subscribe({
      next: params => {
        if(!params)return;
        this.category.set(params.get('category'));
        this.idGallery.set(Number(params.get('id')));
        this.getGalleryByPage(null);
      }
    });
  }

  getGalleryByPage(page: number | null) {
    this.galleryService.getImagesDetail(this.idGallery(), page).subscribe({
      next: response => {
        this.currencyImage = response.data[0];
        this.hasPreviousPage.set(response.pagination.hasPreviousPage);
        this.hasNextPage.set(response.pagination.hasNextPage);
        this.previousPage.set(response.pagination.previousPage);
        this.nextPage.set(response.pagination.nextPage);
      },
      error: err => console.error(err)
    });
  }

  prevImage(): void {
    if(!this.hasPreviousPage()) return;
    this.getGalleryByPage(this.previousPage());
  }

  nextImage(): void {
    if(!this.hasNextPage()) return;
    this.getGalleryByPage(this.nextPage());
  }

  viewOverlay(img: string) {
    this.currencyUrlImage.set(img);
  }

}
