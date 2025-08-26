export interface TrayectoriaDataModel {
  hero:            Hero;
  trayectoria:     PublicacionesTrayectoria[];
  reconocimientos: ReconocimientosSeccion;
  publicaciones:   PublicacionesTrayectoria[];
}

export interface Hero {
  title:       string;
  description: string;
}

export interface PublicacionesTrayectoria {
  titulo:      string;
  fecha?:      Date;
  descripcion: string;
  cta?:        Cta;
  periodo?:    string;
}

export interface Cta {
  text: string;
  url:  string;
}

export interface ReconocimientosSeccion {
  nacionales: Reconocimiento[];
  localesyregionales: Reconocimiento[];
}

export interface Reconocimiento {
  id:          number;
  titulo:      string;
  descripcion: string;
  imagen:      string;
  nameR:       string;
}

// Objeto raíz
export interface RootObjectTrayectoria {
  secciones: TrayectoriaDataModel | null;
}
