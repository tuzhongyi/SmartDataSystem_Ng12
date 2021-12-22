import { Transform } from 'class-transformer';
import { EventNumber } from './event-number.model';
import { transformDateTime } from './transform.model';

/** 事件统计信息 */
export class EventNumberStatistic {
  /**	EventNumber[]	事件数量	M */
  EventNumbers!: EventNumber[];
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime)
  EndTime!: Date;
}
