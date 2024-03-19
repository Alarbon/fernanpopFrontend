import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traduceStatus',
  standalone: true,
})
export class TraduceStatusPipe implements PipeTransform {
  transform(value?: string): unknown {

    if (!value) {
      return "Sin estado";
    }
    switch (value) {
      case 'New':
        return 'Nuevo';
      case 'Like New':
        return 'Como Nuevo';
      case 'Good':
        return 'Bueno';
      case 'Acceptable':
        return 'Aceptable';
      case 'Used':
        return 'Usado';
      case 'Worn':
        return 'Desgastado';
      default:
        return value;
    }
  }
}
