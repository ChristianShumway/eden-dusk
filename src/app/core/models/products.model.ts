
export interface LicenseProductModel {
  id: number;
  value: string;
}

export interface TypeProductModel {
  id: number;
  value: string;
}
export interface OrderTypeProductModel {
  id: string;
  value: string;
}
export interface SizeProductModel {
  id: number;
  value: string;
}

export interface MaterialProductModel {
  id: number;
  value: string;
  subValue: string;
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
  comments?: CommentProductModel[];

}

export interface ResponseProductModel {
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

export interface CommentProductModel {
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

