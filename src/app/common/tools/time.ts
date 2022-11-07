// new Date(time)不影响 time
export class Time {
  // 任意一天的开始时间
  static beginTime(time: Date) {
    return new Date(new Date(time).setHours(0, 0, 0, 0));
  }
  // 任意一天的结束时间
  static endTime(time: Date) {
    return new Date(new Date(time).setHours(23, 59, 59, 999));
  }
  // 后退n天
  static backDate(time: Date, n: number) {
    return new Date(new Date(time).getTime() - n * 24 * 60 * 60 * 1000);
  }
  // 前进n天
  static forwardDate(time: Date, n: number) {
    return new Date(new Date(time).getTime() + n * 24 * 60 * 60 * 1000);
  }
  /**
   * 当前日期所在的周
   * @param time 当前时间
   * @param firstIsSunday 默认0表示星期天
   * @returns \{beginTime:Date,endTime:Date}
   */
  static curWeek(time: Date, firstIsSunday = true) {
    let offset = time.getDay() - (firstIsSunday ? 0 : 1);
    let beginTime = Time.beginTime(this.backDate(time, offset));
    let endTime = Time.endTime(Time.forwardDate(beginTime, 6));
    return {
      beginTime,
      endTime,
    };
  }
  // 当前日期所在的月
  static curMonth(t: Date) {
    let beginTime = new Date(t.getFullYear(), t.getMonth(), 1, 0, 0, 0, 0);
    let endTime = new Date(t.getFullYear(), t.getMonth() + 1, 1, 0, 0, 0, 0);
    endTime = Time.endTime(Time.backDate(endTime, 1));
    return {
      beginTime,
      endTime,
    };
  }
}
