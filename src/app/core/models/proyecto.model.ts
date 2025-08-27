export interface ProyectoModel {
  id: number;
  title: string;
  description: string;
  date: string; // Formato: '"2025-05-14"
  category: string;
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

export interface ResponseProyectosModel {
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
  data: ProyectoModel[];
}

export interface CategoryProyectoModel {
  label: string;
  id: string;
}

export interface FiltersProyectos {
  category: string;
  per_page: number;
  page: number;
  search?: string;
}
