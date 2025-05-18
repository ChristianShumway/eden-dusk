export type CategoryGallery = 'Astrofotografía' | 'Paisajes y Naturaleza' | 'Colaboraciones Culturales' | 'Retratos e Identidad' | 'Expresiones Urbanas' | '';

export interface CategoryGalleryModel {
  id: number;
  name: CategoryGallery;
  subcategories?: SubCategoryGalleryModel[];
}

export interface SubCategoryGalleryModel {
  id: number;
  name: string;
}


export interface CollaboratorGalleryModel {
  id: number;
  name: string;
}












export interface ArticleModel {
  id: number;
  title: string;
  description: string;
  date: string; // Formato: 'yyyy/MM/dd'
  category: CategoryGallery;
  imageUrl: string;
  imageUrlThumbnail: string;
  imageUrlMedium: string;
  color: string;
  authorImage: string;
  authorName: string;
}

export interface ResponseArticleModel {
  // total: number;
  // data: ArticleModel[];
  id: number;
  title: string;
  description: string;
  date: string; // Formato: 'yyyy/MM/dd'
  category: CategoryGallery;
  imageUrl: string;
  imageUrlThumbnail: string;
  imageUrlMedium: string;
  color: string;
  authorImage: string;
  authorName: string;
}


export interface FiltersGallery {
  status?:             number;
  limit?:              number;
  page?:               number;
  category:            CategoryGallery;
  subcategory?:        string;
  search?:             string;
  date?:               string;
  collaborator?:       string;

}
