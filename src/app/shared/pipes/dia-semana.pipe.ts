// src/app/pipes/dia-semana.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaSemana',
  standalone: true,
})
export class DiaSemanaPipe implements PipeTransform {
  private readonly dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  transform(value: Date | string): string {
    const fecha = new Date(value);
    const diaIndex = fecha.getDay(); // 0 = domingo, 1 = lunes, etc.
    return this.dias[diaIndex] ?? '';
  }
}
