import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToSeconds',
})
export class SecondsConverterPipe implements PipeTransform {
  transform(total: number): string {
    const secs = total % 60;
    return secs < 10 ? `0${secs}` : `${secs}`;
  }
}
