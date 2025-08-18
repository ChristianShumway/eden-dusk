// Interfaz genérica para un botón
export interface Boton {
  texto: string;
  link: string;
}

// Hero
export interface HeroHome {
  titulo: string;
  subtitulo: string;
  boton: Boton;
}

// Sobre Nosotros
export interface SobreNosotros {
  titulo: string;
  descripcion: string;
  boton: Boton;
}

// Item de proyectos en curso
export interface ProyectoItem {
  tipo: string;
  titulo: string;
  descripcion: string;
  link: string;
}

// Proyectos en curso
export interface ProyectosEnCurso {
  titulo: string;
  items: ProyectoItem[];
  boton: Boton;
}

// Súmate
export interface Sumate {
  titulo: string;
  descripcion: string;
  botones: Boton[];
  impresion: string[];
}

// Agrupación de secciones
export interface SeccionesHome {
  hero: HeroHome;
  sobreNosotros: SobreNosotros;
  proyectosEnCurso: ProyectosEnCurso;
  sumate: Sumate;
}

// Objeto raíz
export interface RootObjectHome {
  secciones: SeccionesHome | null;
}
