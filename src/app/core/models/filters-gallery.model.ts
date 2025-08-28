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
  product?: ProductoModel[];

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
  collaboratorName?:   string;
}


export interface ProductoModel {
  ID:                    number;
  post_author:           string;
  post_date:             Date;
  post_date_gmt:         Date;
  post_content:          string;
  post_title:            string;
  post_excerpt:          string;
  post_status:           string;
  comment_status:        string;
  ping_status:           string;
  post_password:         string;
  post_name:             string;
  to_ping:               string;
  pinged:                string;
  post_modified:         Date;
  post_modified_gmt:     Date;
  post_content_filtered: string;
  post_parent:           number;
  guid:                  string;
  menu_order:            number;
  post_type:             string;
  post_mime_type:        string;
  comment_count:         string;
  filter:                string;
}
