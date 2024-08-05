export class DateTimeDayTool {
  before(date: Date, day: number) {
    let begin = new Date(date.getTime());
    begin.setDate(begin.getDate() - day);
    begin.setHours(0, 0, 0, 0);
    let end = new Date(date.getTime());
    end.setHours(23, 59, 59, 999);
    return {
      begin: begin,
      end: end,
    };
  }

  beforeMonth(date: Date) {
    let before = new Date(date.getTime());
    before.setDate(1);
    before.setHours(0, 0, 0, 0);
    before.setSeconds(before.getSeconds() - 1);
    let last = before.getDate();
    return this.before(date, last);
  }
}
