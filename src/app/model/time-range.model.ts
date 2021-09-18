import { Transform } from 'class-transformer';
import { transformTime } from './transform.model';

/** 计数时间段 */
export class TimeRange {
  /**	Time	开始时间，格式：00:00:00	M */
  @Transform(transformTime)
  BeginTime!: Date;
  /**	Time	结束时间，格式：23:59:59	M */
  @Transform(transformTime)
  EndTime!: Date;
}
