export interface CategoriasAlianzas {
  id:     string;
  label:  string;
}

export interface FiltersAlianzas {
  page?:      number;
  per_page?:  number;
  category?:  string;
  search?:    string;
}

export interface AlianzasModel {
  id: number;
  nombre: string;
  imagen: string;
  tipo: string;
  descripcion: string;
}

export interface ResponseAlianzasModel {
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
  data: AlianzasModel[];
}
