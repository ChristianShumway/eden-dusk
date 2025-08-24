// Agrupación de secciones
export interface SeccionesServicio {
  produccionImagen: TipoServicio;
  postproduccion: TipoServicio;
  educacionComunidad: TipoServicio;
  comercialInstitucional: TipoServicio;
}

export interface TipoServicio {
  titulo: string;
  servicios: DescripcionServicio[]
}

export interface DescripcionServicio {
  titulo: string;
  descripcion: string;
  ideal: string;
}

// Objeto raíz
export interface RootObjectServicios {
  secciones: SeccionesServicio | null;
}
