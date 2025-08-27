import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { TrayectoriaDataModel } from "../models/trayectoria.model";
import { FiltersCobertura, ResponseCoberturaMediosModel } from "../models/cobertura-medios.model";
import { CategoriasAlianzas, FiltersAlianzas, ResponseAlianzasModel } from "../models/colaboraciones-alianzas.model";

@Injectable({ providedIn: 'root' })

export class TrayectoriaService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathContenido = 'api/contenido-pagina/trayectoria';
  private readonly pathCobertura = 'api/contenido-pagina/trayectoria/covertura-de-medios';
  private readonly pathCategorias = 'api/contenido-pagina/trayectoria/tipo-colaboraciones-y-alianzas';
  private readonly pathAlianzas = 'api/contenido-pagina/trayectoria/colaboraciones-y-alianzas';

  // ?page=1&per_page=10&search=Nombre&tipo=cronicasdecampo

  getDataTrayectoria(): Observable<TrayectoriaDataModel> {
    return this.http.get<TrayectoriaDataModel>(`${this.apiUrl}/${this.pathContenido}`)
      .pipe(
        catchError( error => this.getThrowError(error))
    );
  }

  getCoberturaMedios(filters: FiltersCobertura): Observable<ResponseCoberturaMediosModel> {
    return this.http.get<ResponseCoberturaMediosModel>(
      `${this.apiUrl}/${this.pathCobertura}?per_page=${filters.per_page}&page=${filters.page}`
    ).pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  getCategoriasAlianzas(): Observable<CategoriasAlianzas[]> {
    return this.http.get<CategoriasAlianzas[]>(
      `${this.apiUrl}/${this.pathCategorias}`
    ).pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  getAlianzas(filters: FiltersAlianzas): Observable<ResponseAlianzasModel> {
    let params = new HttpParams();

    if (filters.page != null) {
      params = params.set('page', filters.page.toString());
    }

    if (filters.per_page != null) {
      params = params.set('per_page', filters.per_page.toString());
    }

    if (filters.category != null) {
      params = params.set('tipo', filters.category.toString());
    }

    if (filters.search != null) {
      params = params.set('search', filters.search.toString());
    }

    return this.http.get<ResponseAlianzasModel>(
      `${this.apiUrl}/${this.pathAlianzas}`, { params }
    ).pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  private getThrowError(error: any) {
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
