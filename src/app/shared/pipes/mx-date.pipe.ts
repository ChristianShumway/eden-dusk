import { Pipe, PipeTransform } from "@angular/core";
import { formatDate } from "@angular/common";

@Pipe({
  name: 'dateMx',
  standalone: true
})

export class DateMxPipe implements PipeTransform {
  transform(value: string | Date | undefined): string | Date {
    if(!value) return '-';
    return formatDate(value, 'dd/MM/yyyy', 'en-es')
  }

}
