export interface FiltersCobertura {
  page?:               number;
  per_page?:           number;
}

export interface CoberturaMediosModel {
  id: number;
  fecha: string; // Formato: 'yyyy/MM/dd'
  medio: string;
  tipo: string;
  descripcion: string;
  url?: string;
}

export interface ResponseCoberturaMediosModel {
  page: string;
  per_page: string;
  total: string;
  totalPages: string;
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  nextPage: any,
  previousPage: any,
  lastPage: string;
  firstPage: number;
  currentPage: string;
  data: CoberturaMediosModel[];
}
