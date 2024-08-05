import { DateTimeMonthWeekTool } from './datetime-month-week.tool';

export class DateTimeMonthTool {
  week = new DateTimeMonthWeekTool();

  last(date: Date) {
    let next = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    next.setMilliseconds(-1);
    return next.getDate();
  }
}
