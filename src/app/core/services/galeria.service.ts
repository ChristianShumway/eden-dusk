import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { CategoryGalleryModel, CollaboratorGalleryModel, FiltersGallery, ResponseGalleryModel, ResponseOneGallery } from "../models/filters-gallery.model";

@Injectable({ providedIn: 'root' })

export class GalleryService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathGallery = 'api/galery';

  getCategories(): Observable<CategoryGalleryModel[]> {
    return this.http.get<CategoryGalleryModel[]>(
      `${this.apiUrl}/${this.pathGallery}/categories`
    ).pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  getCollaborators(): Observable<CollaboratorGalleryModel[]> {
    return this.http.get<CollaboratorGalleryModel[]>(
      `${this.apiUrl}/${this.pathGallery}/getCollaborators`
    ).pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  getImagesGallery(filters: FiltersGallery): Observable<ResponseGalleryModel> {
    return this.http.get<ResponseGalleryModel>(
      `${this.apiUrl}/${this.pathGallery}/all?per_page=${filters.per_page}&page=${filters.page}&author=${filters.collaborator}&date=${filters.date}&search=${filters.search}&subcategory=${filters.subcategory}&category=${filters.category}`
    ).pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  getImagesDetail(idImage: number, page: number | null): Observable<ResponseOneGallery> {
    const params = new URLSearchParams();
    if (page !== undefined && page !== null) {
      params.set('page', String(page));
    }
    return this.http.get<ResponseOneGallery>(
      `${this.apiUrl}/${this.pathGallery}/byid/${idImage}${params.toString() ? '?' + params.toString() : ''}`
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
