import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { CategoryProyectoModel, FiltersProyectos, ResponseProyectosModel } from '../models/proyecto.model';

@Injectable({ providedIn: 'root' })

export class ProyectoService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathVideoteca = 'api/video-library';

  getCategories(): Observable<CategoryProyectoModel[]> {
    return this.http.get<CategoryProyectoModel[]>(`${this.apiUrl}/${this.pathVideoteca}/getCategories`)
    .pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  getAllProjects(filters: FiltersProyectos): Observable<ResponseProyectosModel> {
    const category = (filters.category === 'todas') ? '' : filters.category;
    return this.http.get<ResponseProyectosModel>(
      `${this.apiUrl}/${this.pathVideoteca}/all?category=${category}&per_page=${filters.per_page}&page=${filters.page}&search=${filters.search}`
    ).pipe(
      catchError( error => this.getThrowError(error))
    )
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
