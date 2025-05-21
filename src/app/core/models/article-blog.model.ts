export type CategoryArticle =  'Todas' | 'Crónicas de Campo' | 'Educación y Talleres' | 'Novedades y Eventos' | 'Astrofotografía' | 'Perspectivas Ambientales';

export interface ArticleModel {
  id: number;
  title: string;
  description: string;
  date: string; // Formato: '"2025-05-14"
  category: CategoryArticle;
  imageUrl: string;
  imageUrlThumbnail: string;
  imageUrlMedium: string;
  color: string;
  authorImage: string;
  authorName: string;
  smallDescription: string;
  comments?: CommentArticleModel[];
}

export interface ResponseArticleModel {
  page: string;
  per_page: string;
  total: string;
  totalPages: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: boolean | null;
  previousPage: boolean | null;
  lastPage: string;
  firstPage: number,
  currentPage: string;
  data: ArticleModel[];
}

export interface CategoryArticleModel {
  label: CategoryArticle;
  id: string;
}

export interface FiltersArticle {
  category: string;
  per_page: number;
  page: number;
  search?: string;
}


export interface CommentArticleModel {
  id: number;
  name: string;
  email: string;
  comment: string;
  rating: number;
  avatar: string;
  date: Date;
  postId: number;
}

export interface RequestNewComment {
  name: string;
  idPost: number;
  email: string;
  rating: number;
  avatar: string;
  comment: string;
}
