import { Transform } from 'class-transformer';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
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
    let duration = DateTimeTool.allMonth(date);
    let params = new DurationParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    return params;
  }
  static allDay(date: Date) {
    let duration = DateTimeTool.allDay(date);
    let params = new DurationParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    return params;
  }
  static allWeek(date: Date, firstDay = 1) {
    let duration = DateTimeTool.allWeek(date, firstDay);
    let params = new DurationParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    return params;
  }

  static beforeAndAfter(date: Date, seconds: number = 30) {
    let duration = DateTimeTool.beforeOrAfter(date, seconds);
    let params = new DurationParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    return params;
  }
}
export class PagedDurationParams extends PagedParams {
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime)
  EndTime!: Date;
}
