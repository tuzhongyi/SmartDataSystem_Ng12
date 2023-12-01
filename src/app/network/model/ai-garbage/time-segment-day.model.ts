import { IModel } from '../model.interface';
import { AIGarbageTimeSegment } from './time-segment.model';

export class AIGarbageDayTimeSegment implements IModel {
  /**	Int32	星期几0-6	M	*/
  DayOfWeek!: number;
  /**	TimeSegment[]	工作时间段，最多4个时间段	O	*/
  Segments?: AIGarbageTimeSegment[];
}
