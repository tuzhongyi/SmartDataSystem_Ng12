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

  getMonthWeek(date: Date) {
    /**
     * a = d = 当前日期
     * b = 6 - w = 当前周的还有几天过完(不算今天)
     * a + b 的和在除以7 就是当天是当前月份的第几周
     */

    let w = date.getDay();
    let d = date.getDate();
    if (w == 0) {
      w = 7;
    }

    let week = Math.ceil((d + 6 - w) / 7);

    return week;
  }
}
