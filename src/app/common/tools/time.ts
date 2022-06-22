export class Time {
  // 任意一天的开始时间
  static beginTime(time: Date) {
    return new Date(time.setHours(0, 0, 0, 0));
  }
  // 任意一天的结束时间
  static endTime(time: Date) {
    return new Date(time.setHours(23, 59, 59, 999));
  }
}
