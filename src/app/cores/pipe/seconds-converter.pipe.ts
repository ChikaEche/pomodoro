import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToMinutes',
})
export class MinutesConverterPipe implements PipeTransform {
  minutes: number;
  seconds: number;
  minute: string;
  second: string;

  transform(seconds: number): string {
    this.minutes = Math.floor(seconds / 60);
    this.minute = this.minutes < 10 ? '0' + this.minutes : '' + this.minutes;
    return this.minute;
  }
}

@Pipe({
  name: 'convertToSeconds',
})
export class SecondsConverterPipe implements PipeTransform {
  seconds: number;
  second: string;

  transform(seconds: number): string {
    this.seconds = seconds % 60;
    this.second = this.seconds < 10 ? '0' + this.seconds : '' + this.seconds;
    return this.second;
  }
}
