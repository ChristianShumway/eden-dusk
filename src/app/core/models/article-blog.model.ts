export type CategoryArticle =  'Todas' | 'Crónicas de Campo' | 'Educación y Talleres' | 'Novedades y Eventos' | 'Astrofotografía' | 'Perspectivas Ambientales';

export interface ArticleModel {
  id: number;
  title: string;
  description: string;
  date: string; // Formato: 'yyyy/MM/dd'
  type: CategoryArticle;
  time: string; // "12:00:00"
  imageUrl: string;
  imageUrlThumbnail: string;
  imageUrlMedium: string;
  color: string;
}

export interface CategoryArticleModel {
  id: number;
  name: CategoryArticle;
}
