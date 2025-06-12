import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recentDate',
  standalone: true
})

export class RecentDatePipe implements PipeTransform {
  transform(value: string | Date): 'reciente' | null {
    const inputDate = new Date(value);
    const now = new Date();
    const diffInMs = now.getTime() - inputDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays <= 7 ? 'reciente' : null;
  }
}
