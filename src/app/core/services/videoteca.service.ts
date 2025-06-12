import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { VideotecaModel, CategoryVideotecaModel, ResponseVideotecaModel, FiltersVideoteca } from '../models/videoteca.model';

export const VIDEOS_DUMMY: VideotecaModel[] = [
  {
    id: 1,
    title: 'Explorando el Universo',
    description: 'Una mirada profunda a las galaxias más lejanas.',
    date: '2025-05-20',
    category: 'Colaboraciones',
    imageUrl: 'https://images.unsplash.com/photo-1728443139578-cdfbf43e1a72?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageUrlThumbnail: 'https://source.unsplash.com/random/400x300?galaxy',
    imageUrlMedium: 'https://source.unsplash.com/random/600x400?galaxy',
    color: '#0f0f0f',
    authorImage: 'https://randomuser.me/api/portraits/men/4.jpg',
    authorName: 'Luis Fernández',
    smallDescription: 'Viajamos a través del espacio con imágenes de la NASA.',
    codeVideo: 'ScMzIvxBSi4', // YouTube ID
    platform: 'youtube'
  },
  {
    id: 2,
    title: 'La naturaleza del tiempo',
    description: 'Charla sobre la percepción humana del tiempo.',
    date: '2025-04-18',
    category: 'Documentales',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1748960861503-99b1f5412a81?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageUrlThumbnail: 'https://source.unsplash.com/random/400x300?time',
    imageUrlMedium: 'https://source.unsplash.com/random/600x400?time',
    color: '#1e293b',
    authorImage: 'https://randomuser.me/api/portraits/women/5.jpg',
    authorName: 'Claudia Ríos',
    smallDescription: 'Reflexiones sobre el pasado, presente y futuro.',
    codeVideo: '76979871', // Vimeo ID
    platform: 'vimeo'
  },
  {
    id: 3,
    title: 'Cinematografía práctica',
    description: 'Técnicas sencillas para lograr tomas impactantes.',
    date: '2025-03-30',
    category: 'Eventos en vivo',
    imageUrl: 'https://images.unsplash.com/photo-1749539546214-ab2e69e23ced?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageUrlThumbnail: 'https://source.unsplash.com/random/400x300?film',
    imageUrlMedium: 'https://source.unsplash.com/random/600x400?film',
    color: '#334155',
    authorImage: 'https://randomuser.me/api/portraits/men/6.jpg',
    authorName: 'Fernando Gómez',
    smallDescription: 'Aprende planos, movimiento de cámara y luz natural.',
    codeVideo: 'x7vo6rr', // Dailymotion ID
    platform: 'dailymotion'
  },
  {
    id: 4,
    title: 'Cinematografía práctica',
    description: 'Técnicas sencillas para lograr tomas impactantes.',
    date: '2025-03-30',
    category: 'Eventos en vivo',
    imageUrl: 'https://images.unsplash.com/photo-1749539546214-ab2e69e23ced?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageUrlThumbnail: 'https://source.unsplash.com/random/400x300?film',
    imageUrlMedium: 'https://source.unsplash.com/random/600x400?film',
    color: '#334155',
    authorImage: 'https://randomuser.me/api/portraits/men/6.jpg',
    authorName: 'Fernando Gómez',
    smallDescription: 'Aprende planos, movimiento de cámara y luz natural.',
    codeVideo: 'x7vo6rr', // Dailymotion ID
    platform: 'dailymotion'
  },
];

const CATEGORIES_DUMMY: CategoryVideotecaModel[] = [
  {
    label: 'Todas',
    id: 'todas'
  },
  {
    label: 'Documentales',
    id: 'documentales'
  },
  {
    label: 'Cortometrajes',
    id: 'cortometrajes'
  },
  {
    label: 'Videoclips',
    id: 'videoclips'
  },
  {
    label: 'Colaboraciones',
    id: 'colaboraciones'
  }
];

@Injectable({ providedIn: 'root' })

export class VideotecaService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathVideoteca = 'api/videoteca';


  getCategories(): Observable<CategoryVideotecaModel[]> {
    return of (CATEGORIES_DUMMY);
    return this.http.get<CategoryVideotecaModel[]>(`${this.apiUrl}/${this.pathVideoteca}/categories`)
    .pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  getAllVideosDummy(filters: FiltersVideoteca): Observable<VideotecaModel[]> {
    return of (VIDEOS_DUMMY);
  }

  getAllVideos(filters: FiltersVideoteca): Observable<ResponseVideotecaModel> {
    const category = (filters.category === 'todas') ? '' : filters.category;
    return this.http.get<ResponseVideotecaModel>(
      `${this.apiUrl}/${this.pathVideoteca}/posts?category=${category}&per_page=${filters.per_page}&page=${filters.page}`
    ).pipe(
      catchError( error => this.getThrowError(error))
    )
  }

  getVideoById(id: number): Observable<VideotecaModel> {
    return of (VIDEOS_DUMMY[id - 1]);
    return this.http.get<VideotecaModel>(`${this.apiUrl}/${this.pathVideoteca}/posts/${id}`)
      .pipe(
        catchError( error => this.getThrowError(error))
    );
  }

  getThrowError(error: any) {
    const statusCode = error.status;
    switch (statusCode) {
      case 401:
        return throwError(() => 'Acceso no autorizado');
      case 404:
        return throwError(() => 'Endpoint no encontrado');
      default:
        break;
    }
    return throwError(() => error.statusText)
  }


}
