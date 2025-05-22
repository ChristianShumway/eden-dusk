import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'dateMx',
  standalone: true
})

export class DateMxPipe implements PipeTransform {
  transform(value: string | Date | undefined): string | Date {
    if(!value) return '-';

    const date = new Date(value);

    return new Intl.DateTimeFormat('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

}
