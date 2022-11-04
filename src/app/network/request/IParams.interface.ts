import { Exclude, Transform } from 'class-transformer';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { transformDateTime } from '../model/transform.model';

export interface IParams {}
export class PagedParams implements IParams {
  /**页码[1-n](可选) */
  PageIndex: number = 1;
  /**分页大小[1-100](可选) */
  PageSize: number = 9999;
}
export class DurationParams {
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime)
  EndTime!: Date;

  static TimeUnit(unit: TimeUnit, date: Date, firstDay = 1) {
    switch (unit) {
      case TimeUnit.Month:
        return DurationParams.allMonth(date);
      case TimeUnit.Week:
        return DurationParams.allWeek(date, firstDay);
      case TimeUnit.Hour:
      case TimeUnit.Day:
      default:
        return DurationParams.allDay(date);
    }
  }

  static allMonth(date: Date) {
    let params = new DurationParams();
    params.BeginTime = new Date(date.getFullYear(), date.getMonth(), 1);
    let next = new Date(params.BeginTime.getTime());
    next.setMonth(next.getMonth() + 1);
    next.setMilliseconds(-1);
    params.EndTime = next;
    return params;
  }
  static allDay(date: Date) {
    let params = new DurationParams();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    params.BeginTime = new Date(year, month, day);
    let next = new Date(params.BeginTime.getTime());
    next.setDate(next.getDate() + 1);
    next.setMilliseconds(-1);
    params.EndTime = next;
    return params;
  }
  static allWeek(date: Date, firstDay = 0) {
    let params = new DurationParams();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let weekDay = date.getDay() - firstDay;

    let begin = new Date(year, month, day);
    begin.setDate(begin.getDate() - weekDay);
    begin.toISOString;
    params.BeginTime = begin;
    let next = new Date(begin.getTime());
    next.setDate(next.getDate() + 7);
    next.setMilliseconds(-1);
    params.EndTime = next;
    return params;
  }

  static beforeAndAfter(date: Date, seconds: number = 30) {
    let params = new DurationParams();

    let begin = new Date(date.getTime());
    begin.setSeconds(begin.getSeconds() - seconds);
    params.BeginTime = new Date(begin.getTime());

    let end = new Date(date.getTime());
    end.setSeconds(end.getSeconds() + seconds);
    params.EndTime = end;

    return params;
  }
}
export class PagedIntervalParams extends PagedParams {
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime)
  EndTime!: Date;
}
