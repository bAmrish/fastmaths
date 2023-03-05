import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'appTime'})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number): string {
    const s = value % 60;
    if (value < 60) {
      return `${s} s`
    }
    const m = ((value - s) / 60) % 60;
    if (value < 3600) {
      return `${m} m ${s} s`
    }
    const h = (value - (m * 60) - s) / 3600
    return `${h} h ${m} m ${s} s`
  }

}
