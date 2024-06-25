import { Transform, Type } from 'class-transformer';
import { IModel } from './model.interface';
import { DayTimeSegment } from './time-segment-day.model';
import { TimeSegment } from './time-segment.model';
import { Time } from './time.model';
import { transformTime } from './transform.model';

export class Schedule implements IModel {
  /**	TimeSegment[]	每日风扇开关时段	O	*/
  @Type(() => TimeSegment)
  ExhaustFanTimeSegments?: TimeSegment[];
  /**	Time[]	每日香氛喷洒时间点	O	*/
  @Transform(transformTime)
  SprayTimes?: Time[];
  /**	DayTimeSegment[]	感应开门周工作表	O */
  @Type(() => DayTimeSegment)
  DoorOpenTimes?: DayTimeSegment[];
}
