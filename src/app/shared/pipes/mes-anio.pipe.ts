import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mesNombre',
  standalone: true // si estás usando Angular standalone
})
export class MesNombrePipe implements PipeTransform {
  private readonly meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  transform(value: number | string): string {
    const mesIndex = typeof value === 'string' ? parseInt(value, 10) : value;

    if (isNaN(mesIndex) || mesIndex < 1 || mesIndex > 12) {
      return 'Mes inválido';
    }

    return this.meses[mesIndex - 1]; // -1 porque los arrays en JS empiezan en 0
  }
}
