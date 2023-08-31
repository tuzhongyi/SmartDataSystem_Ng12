import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'howellTime',
})
export class HowellTimePipe implements PipeTransform {
  transform(time?: number) {
    if (time === undefined) return undefined;
    let hour = Math.floor(time / 60);
    let minute = time - hour * 60;
    let res =
      hour == 0
        ? Math.ceil(minute) + '分钟'
        : hour + '小时' + Math.ceil(minute) + '分钟';
    return res;
  }
}
