import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { DisposalCountType } from './disposal-count.enum';

// 设备数量接口
export interface IDisposalCount {
  //标题
  label: string;
  // 数量
  count: number;

  tag: DisposalCountType;
}
// 垃圾滞留处置情况
export class DisposalCountModel {
  id: string = '';
  name: string = '';

  // 已处置率
  handledPercentage: number = 0;

  // 处置数量情况
  disposalCountArray: Array<IDisposalCount> = [];

  unit: string = '起';

  timeoutRatio: number = 0;
}

export interface DisposalCountArgs {
  divisionId: string;
  status?: GarbageTaskStatus;
}
