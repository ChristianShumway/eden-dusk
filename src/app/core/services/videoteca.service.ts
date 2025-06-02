import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { ArticleModel, CategoryArticleModel, FiltersArticle, ResponseArticleModel } from '../models/article-blog.model';
import { VideotecaModel, CategoryVideotecaModel } from '../models/videoteca.model';

const VIDEOS_DUMMY: VideotecaModel[] = Array.from({ length: 20 }, (_, i) => {
  const categories = [
    'Todas',
    'Documentales',
    'Cortometrajes',
    'Videoclips',
    'Colaboraciones',
    'Eventos en vivo'
  ] as const;

  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const date = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    .toISOString()
    .split('T')[0]
    .replace(/-/g, '/');

  return {
    id: i + 1,
    title: `Artículo de muestra #${i + 1}`,
    description: `Este es un texto de ejemplo para el artículo número ${i + 1}. Explora temas relacionados con ${randomCategory}.`,
    date,
    category: randomCategory,
    imageUrl: `https://picsum.photos/seed/article${i + 1}/800/600`,
    imageUrlThumbnail: `https://picsum.photos/seed/thumb${i + 1}/300/200`,
    imageUrlMedium: `https://picsum.photos/seed/medium${i + 1}/600/400`,
    color: ['#FF5733', '#33B5FF', '#28A745', '#FFC107', '#6F42C1'][i % 5],
    authorImage: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i}.jpg`,
    authorName: `Autor ${i + 1}`,
    smallDescription: 'prueba solamente'
  };
});

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

  getAllVideos(filters: FiltersArticle): Observable<ResponseArticleModel> {
    const category = (filters.category === 'todas') ? '' : filters.category;
    return this.http.get<ResponseArticleModel>(
      `${this.apiUrl}/${this.pathVideoteca}/posts?category=${category}&per_page=${filters.per_page}&page=${filters.page}`
    ).pipe(
      catchError( error => this.getThrowError(error))
    )
  }

  getVideoById(id: number): Observable<ArticleModel> {
    return this.http.get<ArticleModel>(`${this.apiUrl}/${this.pathVideoteca}/posts/${id}`)
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
