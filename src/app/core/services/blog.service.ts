import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { ArticleModel, CategoryArticleModel } from '../models/article-blog.model';

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
    authorName: `Autor ${i + 1}`
  };
});

@Injectable({ providedIn: 'root' })

export class BlogService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathBlog = 'api/events';

  getCategories(): Observable<CategoryArticleModel[]> {
    return of (FILTERS_DUMMY);
  }

  getAllArticles(): Observable<ArticleModel[]> {
    return of (ARTICLES_DUMMY);
  }

  getArticleById(id: number): Observable<ArticleModel> {
    const article = ARTICLES_DUMMY.find(article => article.id = id);
    if(!article) return of (ARTICLES_DUMMY[0]);
    return of (article);
  }

  getHighlights(): Observable<ArticleModel[]> {
    return of (ARTICLES_DUMMY).pipe(
      map(articles => articles.slice(0, 5))

    );
  }

  // getTransmissionsByMonth(category: string): Observable<ArticleModel[]> {
  //   return this.http.get<ArticleModel[]>(`${this.apiUrl}/${this.pathBlog}?category='${category}'`);
  // }




}
