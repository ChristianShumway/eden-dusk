import { Pipe, PipeTransform } from '@angular/core';
import { TransmisionModel } from '../../core/models/transmission.model';

@Pipe({
  name: 'timezones',
  standalone: true
})
export class TimezonesPipe implements PipeTransform {

  private readonly zonas: Record<string, string> = {
    'noroeste': 'America/Tijuana',
    'pacifico': 'America/Mazatlan',
    'centro': 'America/Mexico_City',
    'sureste': 'America/Cancun'
  };

  private readonly nombres: Record<string, string> = {
    'noroeste': 'Noroeste (Tijuana)',
    'pacifico': 'Pacífico (Sinaloa)',
    'centro': 'Centro (CDMX)',
    'sureste': 'Sureste (Cancún)'
  };

  transform(evento: TransmisionModel | undefined, zonaEspecifica?: string): any {
    if(!evento) return '';
    let fechaBase = new Date(evento.date).toISOString().split('T')[0]
    const fechaEvento = new Date(`${fechaBase}T${evento.time}`);

    if (zonaEspecifica) {
      const clave = zonaEspecifica.toLowerCase();
      const timeZone = this.zonas[clave];
      const nombreZona = this.nombres[clave];

      if (!timeZone) return `Zona inválida`;

      return new Intl.DateTimeFormat('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone,
        timeZoneName: undefined
      }).format(fechaEvento) + ` ${nombreZona}`;
    }

    const resultados: Record<string, string> = {};

    for (const clave of Object.keys(this.zonas)) {
      const timeZone = this.zonas[clave];
      const nombreZona = this.nombres[clave];
      const horaConvertida = new Intl.DateTimeFormat('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone,
        timeZoneName: undefined
      }).format(fechaEvento) + ` ${nombreZona}`;

      resultados[nombreZona] = horaConvertida;
    }

    return resultados;
  }
}
