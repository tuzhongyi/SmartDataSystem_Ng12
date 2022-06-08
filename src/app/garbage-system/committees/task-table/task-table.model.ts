import { EventType } from 'src/app/enum/event-type.enum';

export class TaskTableViewModel<T = any> {
  Id: string = '';
  /** 索引 */
  Index: number = 1;
  /** 厢房名称 */
  StationName: string = '';
  /** 处置人 */
  Processor: string = '';
  /** 落地时长 */
  Interval: string = '';
  /** 垃圾落地时间 */
  Time: string = '';
  /** 状态 */
  State: EventType = EventType.GarbageDrop;
  StateLanguage: string = '';
  data?: T;
}
