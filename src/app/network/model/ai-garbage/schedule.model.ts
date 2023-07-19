import { Time } from '@angular/common';
import { Transform, Type } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformTime } from '../transform.model';
import { AIGarbageTimeSegment } from './time-segment.model';

export class AIGarbageSchedule implements IModel {
  /**	TimeSegment[]	每日风扇开关时段	O	*/
  @Type(() => AIGarbageTimeSegment)
  ExhaustFanTimeSegments?: AIGarbageTimeSegment[];
  /**	Time[]	每日香氛喷洒时间点	O	*/
  @Transform(transformTime)
  SprayTimes?: Time[];
}
