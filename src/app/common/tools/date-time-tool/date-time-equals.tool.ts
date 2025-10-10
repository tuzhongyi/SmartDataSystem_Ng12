import { TimeUnit } from 'src/app/enum/time-unit.enum';

export class DateTimeEqualsTool {
  today(date: Date): boolean {
    return this.equal.day(date, new Date());
  }
  equal = new DateEqualsTool();
  first = new FirstTool();
  than = new ThanTool(this.equal);
}

class DateEqualsTool {
  unit(unit: TimeUnit, date1: Date, date2: Date): boolean {
    switch (unit) {
      case TimeUnit.Hour:
        return this.hour(date1, date2);
      case TimeUnit.Day:
        return this.day(date1, date2);
      case TimeUnit.Week:
        return this.week(date1, date2);
      case TimeUnit.Month:
        return this.month(date1, date2);
      case TimeUnit.Year:
        return this.year(date1, date2);
      default:
        return false;
    }
  }
  day(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  hour(date1: Date, date2: Date): boolean {
    return this.day(date1, date2) && date1.getHours() === date2.getHours();
  }

  week(date1: Date, date2: Date, firstDay = 1): boolean {
    let d1 = new Date(date1.getTime());
    let d2 = new Date(date2.getTime());
    let day1 = d1.getDay();
    let day2 = d2.getDay();
    if (day1 === 0) {
      day1 = 7;
    }
    if (day2 === 0) {
      day2 = 7;
    }
    d1.setDate(d1.getDate() - day1 + firstDay);
    d2.setDate(d2.getDate() - day2 + firstDay);
    return this.day(d1, d2);
  }
  month(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  }
  year(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear();
  }
}

class FirstTool {
  hour(date: Date): boolean {
    return date.getHours() === 0;
  }
  day(date: Date): boolean {
    return date.getDate() === 1;
  }
  week(date: Date, firstDay = 1): boolean {
    let day = date.getDay();
    if (day === 0) {
      day = 7;
    }
    return day === firstDay;
  }
  month(date: Date): boolean {
    return date.getDate() === 1;
  }
  year(date: Date): boolean {
    return date.getMonth() === 0;
  }
}
class ThanTool {
  constructor(private equals: DateEqualsTool) {}
  unit(date1: Date, date2: Date, unit: TimeUnit): boolean {
    switch (unit) {
      case TimeUnit.Hour:
        return this.hour(date1, date2);
      case TimeUnit.Day:
        return this.day(date1, date2);
      case TimeUnit.Month:
        return this.month(date1, date2);
      case TimeUnit.Year:
        return this.year(date1, date2);

      default:
        return false;
    }
  }

  year(date1: Date, date2: Date): boolean {
    return date1.getFullYear() > date2.getFullYear();
  }
  month(date1: Date, date2: Date): boolean {
    if (this.year(date1, date2)) {
      return true;
    }
    if (this.equals.year(date1, date2)) {
      return date1.getMonth() > date2.getMonth();
    }
    return false;
  }
  day(date1: Date, date2: Date): boolean {
    if (this.month(date1, date2)) {
      return true;
    }
    if (this.equals.month(date1, date2)) {
      return date1.getDate() > date2.getDate();
    }
    return false;
  }
  hour(date1: Date, date2: Date): boolean {
    if (this.day(date1, date2)) {
      return true;
    }
    if (this.equals.day(date1, date2)) {
      return date1.getHours() > date2.getHours();
    }
    return false;
  }
}
