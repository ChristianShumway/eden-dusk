import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { ImageGalleryModel } from '../../../../core/models/filters-gallery.model';
import { GalleryService } from '../../../../core/services/galeria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-imagen',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './detalle-imagen.component.html',
  styleUrl: './detalle-imagen.component.scss'
})

export class DetalleImagenComponent implements OnInit {


  images: ImageGalleryModel[] = []; // Llénalo desde un endpoint o dummy
  selectedIndex = 0;
  modalOpen = false;

  private readonly ar = inject(ActivatedRoute);
  private readonly galleryService = inject(GalleryService);

  ngOnInit(): void {
    this.initParams();
    // setInterval(() => this.nextImage(), 10000); // Cambia cada 10 segundos
  }

  initParams() {
    this.ar.paramMap.pipe(
      switchMap( (params: ParamMap) => {
        return this.galleryService.getImages(Number(params.get('id')));
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
    this.selectedIndex =
      (this.selectedIndex - 1 + this.images.length) % this.images.length;
  }

  openModal(image: ImageGalleryModel): void {
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.modalOpen = false;
    document.body.style.overflow = '';
  }

}
