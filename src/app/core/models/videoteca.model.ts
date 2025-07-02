export type CategoryVideoteca =  'Todas' | 'Documentales' | 'Cortometrajes' | 'Videoclips' | 'Colaboraciones' | 'Eventos en vivo';

export interface VideotecaModel {
  id: number;
  title: string;
  description: string;
  date: string; // Formato: '"2025-05-14"
  category: CategoryVideoteca;
  imageUrl: string;
  imageUrlThumbnail: string;
  imageUrlMedium: string;
  color: string;
  autorImage: string;
  autorName: string;
  smallDescription: string;
  codeVideo: string;
  platform: 'youtube' | 'vimeo' | 'dailymotion' | 'dai';
}

export interface ResponseVideotecaModel {
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
  data: VideotecaModel[];
}

export interface CategoryVideotecaModel {
  label: CategoryVideoteca;
  id: string;
}

export interface FiltersVideoteca {
  category: string;
  per_page: number;
  page: number;
  search?: string;
}
