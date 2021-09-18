import { Transform } from 'class-transformer';
import { EventNumber } from './event-number.model';
import { transformDate } from './transform.model';

/** 事件统计信息 */
export class EventNumberStatistic {
  /**	EventNumber[]	事件数量	M */
  EventNumbers!: EventNumber[];
  /**	DateTime	开始时间	M */
  @Transform(transformDate)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDate)
  EndTime!: Date;
}
