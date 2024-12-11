export class DateTimeMonthWeekTool {
  first(date: Date, firstDay = 1) {
    const first = new Date(date.getFullYear(), date.getMonth(), 1);
    let day = first.getDay();
    if (day === 0 && firstDay === 1) {
      return 7;
    }
    return day;
  }

  index(date: Date, firstDay = 1) {
    let first = this.first(date, firstDay);
    let day = date.getDate();

    return Math.ceil((day + first) / 7);
  }

  getMonthWeek(date: Date): number {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay() || 7; // 获取当月第一天是周几，周日视为第7天
    const dayOfMonth = date.getDate();

    // 计算当前日期是当月的第几周
    return Math.ceil((dayOfMonth + firstDayOfWeek - 1) / 7);
  }
}
