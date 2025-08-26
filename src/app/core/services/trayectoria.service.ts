import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { RootObjectTrayectoria, TrayectoriaDataModel } from "../models/trayectoria.model";

@Injectable({ providedIn: 'root' })

export class TrayectoriaService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathContenido = 'api/contenido-pagina/trayectoria';

  getDataTrayectoria(): Observable<TrayectoriaDataModel> {
    return this.http.get<TrayectoriaDataModel>(`${this.apiUrl}/${this.pathContenido}`)
      .pipe(
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
