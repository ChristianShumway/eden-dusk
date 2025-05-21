import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate',
  standalone: true
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    const inputDate = new Date(value);
    const now = new Date();

    // Elimina la parte de la hora para comparación de días
    const inputDateOnly = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffInTime = nowDateOnly.getTime() - inputDateOnly.getTime();
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

    const timeString = inputDate.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    if (diffInDays === 0) return `Hoy a las ${timeString}`;
    if (diffInDays === 1) return `Ayer a las ${timeString}`;
    if (diffInDays === 2) return `Antier a las ${timeString}`;

    // Si han pasado más de 2 días, muestra la fecha en formato completo
    return inputDate.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
}
