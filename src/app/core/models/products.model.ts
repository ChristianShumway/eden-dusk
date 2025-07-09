
export interface LicenseProductModel {
  id: number;
  value: string;
}

export interface TypeProductModel {
  id: number;
  value: string;
}
export interface OrderTypeProductModel {
  id: number;
  value: string;
}

export interface FiltersProducts {
  page?:        number;
  per_page?:    number;
  license?:     LicenseProductModel;
  search?:      string;
  type?:        TypeProductModel;
  minPrice?:    number;
  maxPrice?:    number;
  order?:       number;
}

export interface SizeProductModel {
  id: string;
  size: string;
}

export interface ProductModel {
  id: number;
  date: string; // Formato: 'yyyy/MM/dd'
  sourceUrl: string;
  description: string;
  name: string;
  price: string;
  license: number;
  type: number;
  size: string;
}

export interface ResponseGalleryModel {
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
  data: ProductModel[];
}

