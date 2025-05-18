export type CategoryArticle =  'Todas' | 'Crónicas de Campo' | 'Educación y Talleres' | 'Novedades y Eventos' | 'Astrofotografía' | 'Perspectivas Ambientales';

export interface ArticleModel {
  id: number;
  title: string;
  description: string;
  date: string; // Formato: 'yyyy/MM/dd'
  category: CategoryArticle;
  imageUrl: string;
  imageUrlThumbnail: string;
  imageUrlMedium: string;
  color: string;
  authorImage: string;
  authorName: string;
}

export interface ResponseArticleModel {
  // total: number;
  // data: ArticleModel[];
  id: number;
  title: string;
  description: string;
  date: string; // Formato: 'yyyy/MM/dd'
  category: CategoryArticle;
  imageUrl: string;
  imageUrlThumbnail: string;
  imageUrlMedium: string;
  color: string;
  authorImage: string;
  authorName: string;
}

export interface CategoryArticleModel {
  id: number;
  name: CategoryArticle;
}

export interface FiltersArticle {
  status?:            number;
  limit:              number;
  page:               number;
  category:           CategoryArticle;
  search:             string;
}
