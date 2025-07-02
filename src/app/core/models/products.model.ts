export type LicenseProduct = 'personal' | 'comercial' | '';
export type TypeProduct = 'digital' | 'enmarcado' | '';


export interface LicenseProductModel {
  id: number;
  label: LicenseProduct;
  name: string;
}

export interface PriceProductModel {
  id: string;
  rangeAmount: string;
}

export interface SizeProductModel {
  id: string;
  size: string;
}

export interface TypeProductModel {
  id: string;
  type: TypeProduct;
}

export interface OrderProductModel {
  id: string;
  typeOrder: string;
}

export interface FiltersProducts {
  page?:        number;
  per_page?:    number;
  license?:      string;
  search?:      string;
  price?:       string;
  order?:       string;
}

export interface ProductModel {
  id: number;
  date: string; // Formato: 'yyyy/MM/dd'
  sourceUrl: string;
  description: string;
  license: LicenseProduct;
  autor: string;
  collaborator: string;
  name: string;
  downloadable: boolean;
  forSale: boolean;
  price: string;
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

