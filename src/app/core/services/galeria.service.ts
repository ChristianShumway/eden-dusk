import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { CategoryGalleryModel, CollaboratorGalleryModel } from "../models/filters-gallery.model";

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

}
