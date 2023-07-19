import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { Time } from '../time.model';
import { transformTime } from '../transform.model';

export class AIGarbageTimeSegment implements IModel {
  /**	Time	开始时间，00:00-23:59	M	*/
  @Transform(transformTime)
  StartTime!: Time;
  /**	Time	结束时间，00:00-23:59	M	*/
  @Transform(transformTime)
  StopTime!: Time;
}
