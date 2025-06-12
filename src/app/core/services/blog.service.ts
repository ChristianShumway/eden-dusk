import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { ArticleModel, AuthorModel, CategoryArticleModel, FiltersArticle, RequestNewComment, ResponseArticleModel, ResponseNewComment } from '../models/article-blog.model';
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
      `${this.apiUrl}/${this.pathBlog}/posts/recomended?category=${filters.category}&per_page=${filters.per_page}&page=${filters.page}&idPost=${filters.idPost}`
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
