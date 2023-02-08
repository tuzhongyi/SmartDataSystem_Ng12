export class Time {
  constructor(time?: string);
  constructor(time?: Time);
  constructor(hour?: number, minute?: number, second?: number);

  constructor(
    time: string | number | Time = 0,
    minute: number = 0,
    second: number = 0
  ) {
    if (typeof time === 'string') {
      let times = time.split(':');
      for (let i = 0; i < times.length; i++) {
        switch (i) {
          case 0:
            this.hour = parseInt(times[i]);
            break;
          case 1:
            this.minute = parseInt(times[i]);
            break;
          case 2:
            this.second = parseInt(times[i]);
            break;

          default:
            break;
        }
      }
    } else if (time instanceof Time) {
      this.hour = time.hour;
      this.minute = time.minute;
      this.second = time.second;
    } else {
      this.hour = time;
      this.minute = minute;
      this.second = second;
    }
  }
  hour: number = 0;
  minute: number = 0;
  second: number = 0;

  toMinutes() {
    return this.hour * 60 + this.minute;
  }
}
