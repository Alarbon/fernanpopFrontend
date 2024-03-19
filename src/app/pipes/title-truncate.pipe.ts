import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleTruncate',
  standalone: true,
})
export class TitleTruncatePipe implements PipeTransform {
  transform(value?: string, length?: number): string {

    if (!value) return 'Sin título';
    if (!length) length = 25;
    if (value.length <= length) return value;
    return value.substring(0, length-1) + '...';
  }
}
