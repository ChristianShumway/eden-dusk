
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { RootObjectServicios } from "../models/servicios-profesionales.model";

@Injectable({ providedIn: 'root' })

export class ServiciosProfesionalesService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathTipoServicios = 'api/events';

  public dataDummy: RootObjectServicios = {
    secciones: {
      produccionImagen: {
        titulo: 'Producción / Imagen',
        servicios: [
          {
            titulo: 'Drone & Aéreo cinematográfico',
            descripcion: 'Tomas 4K/6K estabilizadas con operación responsable en áreas sensibles.',
            ideal: 'turismo, conservación, inspecciones, marcas.'
          },
          {
            titulo: 'Time-lapse & Hyperlapse',
            descripcion: 'Procesos y fenómenos naturales con continuidad de tiempo impecable.',
            ideal: 'construcción, divulgación científica, campañas.'
          },
          {
            titulo: 'Fotografía de retrato (corporativo y documental)',
            descripcion: 'Retratos ejecutivos y ambientales que reflejan identidad y contexto local.',
            ideal: 'instituciones, empresas, emprendedores, liderazgo comunitario.'
          },
          {
            titulo: 'Fotografía de producto con enfoque biocultural',
            descripcion: 'Sets controlados, iluminación y styling con storytelling de origen para e-commerce y gastronomía.',
            ideal: 'restaurantes, marcas gourmet, artesanías, e-commerce.'
          }
        ]
      },
      postproduccion: {
        titulo: 'Postproducción y Estrategia Visual',
        servicios: [
          {
            titulo: 'Edición y corrección de color',
            descripcion: 'Del rough cut al master final, listos para proyección, TV o plataformas.',
            ideal: 'productoras, comunicación institucional, realizadores.'
          },
          {
            titulo: 'Storytelling transmedia',
            descripcion: 'Diseño narrativo por objetivos y audiencias; piezas y versiones por canal.',
            ideal: 'campañas, programas educativos, proyectos multi-sede.'
          },
          {
            titulo: 'Motion graphics y animación',
            descripcion: 'Títulos, inserts y explicativos que clarifican datos y procesos.',
            ideal: 'educación, marca, ONGs.'
          },
          {
            titulo: 'Restauración y archivo digital',
            descripcion: 'Rescate/limpieza de foto/video de archivo, normalización y metadatos.',
            ideal: 'archivos, memoria histórica, instituciones.'
          }
        ]
      },
      educacionComunidad: {
        titulo: 'Educación / Comunidad',
        servicios: [
          {
            titulo: 'Rutas y expediciones fotográficas',
            descripcion: 'Salidas guiadas en campo con protocolos de bajo impacto ambiental.',
            ideal: 'universidades, centros culturais, comunidade.'
          },
          {
            titulo: 'Charlas y conferencias',
            descripcion: 'Astrofotografía, cultura local y conservación, con enfoque divulgativo.',
            ideal: 'foros, festivales, escolas, instituições.'
          },
          {
            titulo: 'Talleres de fotografía biocultural',
            descripcion: 'Técnica fotográfica + contexto ambiental y cultural, orientado a impacto.',
            ideal: 'docentes, estudantes, divulgação.'
          },
          {
            titulo: 'Desarrollo de contenido para museografía',
            descripcion: 'Guion, foto y video para exhibiciones y centros de interpretación.',
            ideal: 'museos, ANP, governos locais, fundações.'
          }
        ]
      },
      comercialInstitucional: {
        titulo: 'Comercial / Institucional',
        servicios: [
          {
            titulo: 'Licenciamiento de contenido de archivo',
            descripcion: 'Uso editorial, educativo o comercial con gestión clara de derechos.',
            ideal: 'medios, editoriales, instituciones.'
          },
          {
            titulo: 'Documentación de proyectos (ONGs y gobierno)',
            descripcion: 'Seguimiento visual y síntesis de resultados con enfoque de impacto.',
            ideal: 'ONGs, academia, dependencias.'
          },
          {
            titulo: 'Campañas de responsabilidad social',
            descripcion: 'Piezas con propósito y medición de resultados para alineación ESG.',
            ideal: 'empresas, fundaciones, turismo responsable.'
          },
          {
            titulo: 'Informes de impacto y memorias anuales',
            descripcion: 'Paquetes foto/video + texto para rendición de cuentas y comunicación pública.',
            ideal: 'RS corporativa, convocatorias, donantes.'
          }
        ]
      }
    }
  }

  getDataServiciosProfesionales(): Observable<RootObjectServicios> {
    return of (this.dataDummy);
    return this.http.get<RootObjectServicios>(`${this.apiUrl}/${this.pathTipoServicios}`);
  }


}
