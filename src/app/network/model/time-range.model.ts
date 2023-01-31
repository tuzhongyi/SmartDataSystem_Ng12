import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { Time } from './time.model';
import { transformTime } from './transform.model';

/** 计数时间段 */
export class TimeRange implements IModel {
  /**	Time	开始时间，格式：00:00:00	M */
  @Transform(transformTime)
  BeginTime!: Time;
  /**	Time	结束时间，格式：23:59:59	M */
  @Transform(transformTime)
  EndTime!: Time;
}
