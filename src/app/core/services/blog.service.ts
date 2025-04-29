import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { ArticleModel, CategoryArticleModel } from "../models/article-blog.model";

const FILTERS_DUMMY: CategoryArticleModel[] = [
  {
    id: 1,
    name: 'Todas'
  },
  {
    id: 2,
    name: 'Astrofotografía'
  },
  {
    id: 3,
    name: 'Crónicas de Campo'
  },
  {
    id: 4,
    name: 'Educación y Talleres'
  },
  {
    id: 5,
    name: 'Novedades y Eventos'
  },
  {
    id: 6,
    name: 'Perspectivas Ambientales'
  }
];

@Injectable({ providedIn: 'root' })

export class BlogService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathBlog = 'api/events';

  getCategories(): Observable<CategoryArticleModel[]> {
    return of (FILTERS_DUMMY);
  }

  // getTransmissionsByMonth(category: string): Observable<ArticleModel[]> {
  //   return this.http.get<ArticleModel[]>(`${this.apiUrl}/${this.pathBlog}?category='${category}'`);
  // }




}
