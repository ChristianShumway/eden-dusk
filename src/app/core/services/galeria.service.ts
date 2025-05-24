import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { CategoryGalleryModel, CollaboratorGalleryModel, FiltersGallery, ImageGalleryModel } from "../models/filters-gallery.model";

const FILTERS_DUMMY: CategoryGalleryModel[] = [
  {
    id: 2,
    name: 'Astrofotografía',
    subcategories: [
      { id: 21, name: 'Galaxias' },
      { id: 22, name: 'Estrellas' },
    ],
  },
  {
    id: 3,
    name: 'Paisajes y Naturaleza',
  },
  {
    id: 4,
    name: 'Colaboraciones Culturales',
    subcategories: [
      { id: 41, name: 'Indígenas' },
      { id: 42, name: 'Festividades' },
    ],
  },
  {
    id: 5,
    name: 'Retratos e Identidad',
  },
  {
    id: 6,
    name: 'Expresiones Urbanas',
  },
];

const COLLABORATORS_DUMMY: CollaboratorGalleryModel[] = [
  { id: 1, name: 'Fotógrafo 1'},
  { id: 2, name: 'Fotógrafo 2'},
  { id: 3, name: 'Fotógrafo 3'}
];


export const DUMMY_IMAGE_GALLERY: ImageGalleryModel[] = [
  {
    id: 1,
    title: 'Aurora Boreal',
    description: 'Una espectacular aurora sobre las montañas nevadas de Noruega.',
    location: 'Tromsø, Noruega',
    date: '2023/12/15',
    category: 'Astrofotografía',
    imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
    imageUrlThumbnail: 'https://example.com/images/aurora-thumb.jpg',
    imageUrlMedium: 'https://example.com/images/aurora-medium.jpg',
    color: '#1f2937',
    authorImage: 'https://example.com/authors/lena.jpg',
    authorName: 'Lena Fjord',
    downloadable: true,
    forSale: false,
  },
  {
    id: 2,
    title: 'Ciudad Nocturna',
    description: 'Luces de neón reflejadas en los rascacielos de una ciudad moderna.',
    location: 'Tokio, Japón',
    date: '2024/01/22',
    category: 'Paisajes y Naturaleza',
    imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg',
    imageUrlThumbnail: 'https://example.com/images/tokyo-thumb.jpg',
    imageUrlMedium: 'https://example.com/images/tokyo-medium.jpg',
    color: '#0f172a',
    authorImage: 'https://example.com/authors/kenta.jpg',
    authorName: 'Kenta Yamada',
    downloadable: false,
    forSale: true,
  },
  {
    id: 3,
    title: 'Desierto Estrellado',
    description: 'Cielo nocturno con la Vía Láctea sobre el desierto.',
    location: 'Sahara, Marruecos',
    date: '2023/08/05',
    category: 'Paisajes y Naturaleza',
    imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg',
    imageUrlThumbnail: 'https://example.com/images/desert-thumb.jpg',
    imageUrlMedium: 'https://example.com/images/desert-medium.jpg',
    color: '#78350f',
    authorImage: 'https://example.com/authors/amina.jpg',
    authorName: 'Amina El-Fassi',
    downloadable: true,
    forSale: true,
  },
  {
    id: 4,
    title: 'Cielo Estrellado',
    description: 'Cielo nocturno con la Vía Láctea sobre el desierto del sahara.',
    location: 'Sahara, Marruecos',
    date: '2023/02/05',
    category: 'Colaboraciones Culturales',
    imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg',
    imageUrlThumbnail: 'https://example.com/images/desert-thumb.jpg',
    imageUrlMedium: 'https://example.com/images/desert-medium.jpg',
    color: '#78350f',
    authorImage: 'https://example.com/authors/amina.jpg',
    authorName: 'Amina El-Fassi',
    downloadable: true,
    forSale: true,
  },
  {
    id: 5,
    title: 'Desierto Estrellado',
    description: 'Cielo nocturno con la Vía Láctea sobre el desierto.',
    location: 'Sahara, Marruecos',
    date: '2023/08/05',
    category: 'Paisajes y Naturaleza',
    imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg',
    imageUrlThumbnail: 'https://example.com/images/desert-thumb.jpg',
    imageUrlMedium: 'https://example.com/images/desert-medium.jpg',
    color: '#78350f',
    authorImage: 'https://example.com/authors/amina.jpg',
    authorName: 'Amina El-Fassi',
    downloadable: true,
    forSale: true,
  },
  {
    id: 6,
    title: 'Desierto Estrellado',
    description: 'Cielo nocturno con la Vía Láctea sobre el desierto.',
    location: 'Sahara, Marruecos',
    date: '2023/08/05',
    category: 'Paisajes y Naturaleza',
    imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg',
    imageUrlThumbnail: 'https://example.com/images/desert-thumb.jpg',
    imageUrlMedium: 'https://example.com/images/desert-medium.jpg',
    color: '#78350f',
    authorImage: 'https://example.com/authors/amina.jpg',
    authorName: 'Amina El-Fassi',
    downloadable: true,
    forSale: true,
  },
  {
    id: 7,
    title: 'Desierto Estrellado',
    description: 'Cielo nocturno con la Vía Láctea sobre el desierto.',
    location: 'Sahara, Marruecos',
    date: '2023/08/05',
    category: 'Paisajes y Naturaleza',
    imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg',
    imageUrlThumbnail: 'https://example.com/images/desert-thumb.jpg',
    imageUrlMedium: 'https://example.com/images/desert-medium.jpg',
    color: '#78350f',
    authorImage: 'https://example.com/authors/amina.jpg',
    authorName: 'Amina El-Fassi',
    downloadable: true,
    forSale: true,
  },
  {
    id: 8,
    title: 'Desierto Estrellado',
    description: 'Cielo nocturno con la Vía Láctea sobre el desierto.',
    location: 'Sahara, Marruecos',
    date: '2023/08/05',
    category: 'Paisajes y Naturaleza',
    imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg',
    imageUrlThumbnail: 'https://example.com/images/desert-thumb.jpg',
    imageUrlMedium: 'https://example.com/images/desert-medium.jpg',
    color: '#78350f',
    authorImage: 'https://example.com/authors/amina.jpg',
    authorName: 'Amina El-Fassi',
    downloadable: true,
    forSale: true,
  },
  {
    id: 9,
    title: 'Desierto Estrellado',
    description: 'Cielo nocturno con la Vía Láctea sobre el desierto.',
    location: 'Sahara, Marruecos',
    date: '2023/08/05',
    category: 'Paisajes y Naturaleza',
    imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg',
    imageUrlThumbnail: 'https://example.com/images/desert-thumb.jpg',
    imageUrlMedium: 'https://example.com/images/desert-medium.jpg',
    color: '#78350f',
    authorImage: 'https://example.com/authors/amina.jpg',
    authorName: 'Amina El-Fassi',
    downloadable: true,
    forSale: true,
  },
  {
    id: 10,
    title: 'Desierto Estrellado',
    description: 'Cielo nocturno con la Vía Láctea sobre el desierto.',
    location: 'Sahara, Marruecos',
    date: '2023/08/05',
    category: 'Paisajes y Naturaleza',
    imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg',
    imageUrlThumbnail: 'https://example.com/images/desert-thumb.jpg',
    imageUrlMedium: 'https://example.com/images/desert-medium.jpg',
    color: '#78350f',
    authorImage: 'https://example.com/authors/amina.jpg',
    authorName: 'Amina El-Fassi',
    downloadable: true,
    forSale: true,
  },
  {
    id: 11,
    title: 'Desierto Estrellado',
    description: 'Cielo nocturno con la Vía Láctea sobre el desierto.',
    location: 'Sahara, Marruecos',
    date: '2023/08/05',
    category: 'Paisajes y Naturaleza',
    imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg',
    imageUrlThumbnail: 'https://example.com/images/desert-thumb.jpg',
    imageUrlMedium: 'https://example.com/images/desert-medium.jpg',
    color: '#78350f',
    authorImage: 'https://example.com/authors/amina.jpg',
    authorName: 'Amina El-Fassi',
    downloadable: true,
    forSale: true,
  },
  {
    id: 12,
    title: 'Desierto Estrellado',
    description: 'Cielo nocturno con la Vía Láctea sobre el desierto.',
    location: 'Sahara, Marruecos',
    date: '2023/08/05',
    category: 'Paisajes y Naturaleza',
    imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg',
    imageUrlThumbnail: 'https://example.com/images/desert-thumb.jpg',
    imageUrlMedium: 'https://example.com/images/desert-medium.jpg',
    color: '#78350f',
    authorImage: 'https://example.com/authors/amina.jpg',
    authorName: 'Amina El-Fassi',
    downloadable: true,
    forSale: true,
  },
];


@Injectable({ providedIn: 'root' })

export class GalleryService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathBlog = 'api/gallery';

  getCategories(): Observable<CategoryGalleryModel[]> {
    return of (FILTERS_DUMMY);
  }

  getCollaborators(): Observable<CollaboratorGalleryModel[]> {
    return of (COLLABORATORS_DUMMY);
  }

  getImagesGallery(filters: FiltersGallery): Observable<ImageGalleryModel[]> {
    console.log(filters)
    return of (DUMMY_IMAGE_GALLERY).pipe(
      map( images => images.slice(0,filters.per_page))
    );
  }

  getImagesDetail(idImage: number): Observable<ImageGalleryModel[]> {
    return of (DUMMY_IMAGE_GALLERY).pipe(
      map( images => images.slice(0,5))
    );
  }

}
