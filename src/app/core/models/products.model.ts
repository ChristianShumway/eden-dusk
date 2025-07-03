export type LicenseProduct = 'personal' | 'comercial' | '';

export interface LicenseProductModel {
  id: LicenseProduct;
  label: string;
}

export interface TypeProductModel {
  id: string;
  label: string;
}
export interface OrderTypeProductModel {
  id: string;
  label: string;
}

export interface FiltersProducts {
  page?:        number;
  per_page?:    number;
  license?:     LicenseProductModel;
  search?:      string;
  type?:        TypeProductModel;
  minPrice?:    number;
  maxPrice?:    number;
  order?:       string;
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
  license: LicenseProduct;
  autor: string;
  name: string;
  price: string;
  size: string;
  type: string;
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

