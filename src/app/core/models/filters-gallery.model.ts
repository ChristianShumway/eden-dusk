export type CategoryGallery = 'Astrofotografía' | 'Paisajes y Naturaleza' | 'Colaboraciones Culturales' | 'Retratos e Identidad' | 'Expresiones Urbanas' | '';

export interface CategoryGalleryModel {
  id: string;
  name: CategoryGallery;
  subcategories?: SubCategoryGalleryModel[];
}

export interface SubCategoryGalleryModel {
  id: string;
  name: string;
}

export interface CollaboratorGalleryModel {
  id: number;
  name: string;
  description: string;
  image: string;
  socialMedia: string;
}

export interface ImageGalleryModel {
  id: number;
  date: string; // Formato: 'yyyy/MM/dd'
  sourceUrl: string;
  description: string;
  category: CategoryGallery;
  autor: string;
  collaborator: string;
  name: string;
  downloadable: boolean;
  forSale: boolean;
  site: string;

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
  data: ImageGalleryModel[];
}


export interface ResponseOneGallery{
  pagination: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number | null;
    previousPage: number | null;
    firstPage: number;
    lastPage: number;
  }
  data: ImageGalleryModel[];
}
export interface FiltersGallery {
  page?:               number;
  per_page?:           number;
  category:            string;
  subcategory?:        string;
  search?:             string;
  date?:               string;
  collaborator?:       number;
}
