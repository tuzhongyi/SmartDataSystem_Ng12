export class Time {
  // 任意一天的开始时间
  static beginTime(time: Date) {
    return new Date(time.setHours(0, 0, 0, 0));
  }
  // 任意一天的结束时间
  static endTime(time: Date) {
    return new Date(time.setHours(23, 59, 59, 999));
  }
  // 后退n天
  static backDate(time: Date, n: number) {
    return new Date(time.getTime() - n * 24 * 60 * 60 * 1000)
  }
  // 前进n天
  static forwardDate(time: Date, n: number) {
    return new Date(time.getTime() + n * 24 * 60 * 60 * 1000)

  }
}
