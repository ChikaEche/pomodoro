import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToMinutes',
})
export class MinutesConverterPipe implements PipeTransform {
  transform(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    return mins < 10 ? `0${mins}` : `${mins}`;
  }
}
