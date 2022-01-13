export class TimeModel {
  constructor(time?: Date);
  constructor(hour: number, minute: number, second: number);
  constructor(time?: Date | number, minute?: number, second?: number) {
    if (!time) {
      time = new Date();
    }
    if (time instanceof Date) {
      this.hour = TimeModel.format(time.getHours());
      this.minute = TimeModel.format(time.getMinutes());
      this.second = TimeModel.format(time.getSeconds());
    } else {
      this.hour = TimeModel.format(time);
      this.minute = TimeModel.format(minute!);
      this.second = TimeModel.format(second!);
    }
  }
  hour: string = '00';
  minute: string = '00';
  second: string = '00';

  static format(num: number) {
    if (num < 10) {
      return `0${num}`;
    }
    return num.toString();
  }
}
