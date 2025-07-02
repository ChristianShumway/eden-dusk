import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { VideotecaModel, CategoryVideotecaModel, ResponseVideotecaModel, FiltersVideoteca } from '../models/videoteca.model';


@Injectable({ providedIn: 'root' })

export class VideotecaService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathVideoteca = 'api/video-library';

  getCategories(): Observable<CategoryVideotecaModel[]> {
    return this.http.get<CategoryVideotecaModel[]>(`${this.apiUrl}/${this.pathVideoteca}/getCategories`)
    .pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  getAllVideos(filters: FiltersVideoteca): Observable<ResponseVideotecaModel> {
    const category = (filters.category === 'todas') ? '' : filters.category;
    return this.http.get<ResponseVideotecaModel>(
      `${this.apiUrl}/${this.pathVideoteca}/all?category=${category}&per_page=${filters.per_page}&page=${filters.page}&search=${filters.search}`
    ).pipe(
      catchError( error => this.getThrowError(error))
    )
  }

  getVideoById(id: number): Observable<VideotecaModel> {
    return this.http.get<VideotecaModel>(`${this.apiUrl}/${this.pathVideoteca}/byid/${id}`)
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
