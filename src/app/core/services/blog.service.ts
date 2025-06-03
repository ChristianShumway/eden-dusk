import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { ArticleModel, AuthorModel, CategoryArticleModel, FiltersArticle, RequestNewComment, ResponseArticleModel, ResponseNewComment } from '../models/article-blog.model';

const ARTICLES_DUMMY: ArticleModel[] = Array.from({ length: 20 }, (_, i) => {
  const categories = [
    'Todas',
    'Crónicas de Campo',
    'Educación y Talleres',
    'Novedades y Eventos',
    'Astrofotografía',
    'Perspectivas Ambientales'
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

@Injectable({ providedIn: 'root' })

export class BlogService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathBlog = 'api/blog';

  getCategories(): Observable<CategoryArticleModel[]> {
    return this.http.get<CategoryArticleModel[]>(`${this.apiUrl}/${this.pathBlog}/categories`)
    .pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  getAllArticles(filters: FiltersArticle): Observable<ResponseArticleModel> {
    const category = (filters.category === 'todas') ? '' : filters.category;
    return this.http.get<ResponseArticleModel>(
      `${this.apiUrl}/${this.pathBlog}/posts?search=${filters.search}&category=${category}&per_page=${filters.per_page}&page=${filters.page}`
    ).pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  getArticleById(id: number): Observable<ArticleModel> {
    return this.http.get<ArticleModel>(`${this.apiUrl}/${this.pathBlog}/posts/${id}`)
      .pipe(
        catchError( error => this.getThrowError(error))
    );
  }

  addCommentToPost(request: RequestNewComment): Observable<ResponseNewComment> {
    console.log(request);
    return this.http.post<ResponseNewComment>(`${this.apiUrl}/${this.pathBlog}/posts/comment`, request)
      .pipe(
        catchError( error => this.getThrowError(error))
    );
  }

  getHighlights(total: number): Observable<ArticleModel[]> {
    return this.http.get<ArticleModel[]>(
      `${this.apiUrl}/${this.pathBlog}/posts/topRatedPost?limit=${total}`
    ).pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  getRecommendedArticles(filters: FiltersArticle): Observable<ArticleModel[]> {
    return this.http.get<ArticleModel[]>(
      `${this.apiUrl}/${this.pathBlog}/posts/recomended?category=${filters.category}&per_page=${filters.per_page}&page=${filters.page}`
    ).pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  getAuthors(): Observable<AuthorModel[]> {
    return this.http.get<AuthorModel[]>(
      `${this.apiUrl}/${this.pathBlog}/authors`
    ).pipe(
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
