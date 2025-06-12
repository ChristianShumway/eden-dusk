import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { GalleryService } from '../../../../core/services/galeria.service';
import { BtnReturnComponent } from '../../../../shared/components/btn-return/btn-return.component';
import { ImageGalleryModel } from '../../../../core/models/filters-gallery.model';
import { ProtectImageDirective } from '../../../../core/directives/protect-images.directive';
import { ImageOverlayComponent } from '../../../../shared/components/image-overlay/image-overlay.component';

@Component({
  selector: 'app-detalle-imagen',
  standalone: true,
  imports: [
    CommonModule,
    BtnReturnComponent,
    ImageOverlayComponent,
    ProtectImageDirective
  ],
  templateUrl: './detalle-imagen.component.html',
  styleUrl: './detalle-imagen.component.scss'
})

export class DetalleImagenComponent implements OnInit {

  public images: ImageGalleryModel[] = []; // Llénalo desde un endpoint o dummy
  public selectedIndex = 0;
  public idImage!: number;
  public category!: string;
  public currencyImage = signal<string>('');

  private readonly ar = inject(ActivatedRoute);
  private readonly galleryService = inject(GalleryService);

  ngOnInit(): void {
    this.initParams();
    // setInterval(() => this.nextImage(), 10000); // Cambia cada 10 segundos
  }

  initParams() {
    this.ar.paramMap.pipe(
      switchMap( (params: ParamMap) => {
        this.category = params.get('category')!;
        console.log(this.category);
        return this.galleryService.getImagesDetail(Number(params.get('id')));
      })
    ).subscribe({
      next: response => {
        console.log(response)
        this.images = response;
      }
    });
  }

  get selectedImage(): ImageGalleryModel {
    return this.images[this.selectedIndex];
  }

  nextImage(): void {
    this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.selectedIndex = (this.selectedIndex - 1 + this.images.length) % this.images.length;
  }

  viewTotal(img: string) {
    this.currencyImage.set(img);
  }

}
