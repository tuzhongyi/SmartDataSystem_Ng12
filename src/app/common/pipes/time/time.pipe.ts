import { Pipe, PipeTransform } from '@angular/core';
import { Time } from 'src/app/network/model/time.model';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value?: Time, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    let hour = value.hour.toString().padStart(2, '0');
    let minute = value.minute.toString().padStart(2, '0');
    let second = value.second.toString().padStart(2, '0');
    return `${hour}:${minute}:${second}`;
  }
}
