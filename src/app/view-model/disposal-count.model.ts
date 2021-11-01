import { DisposalCountType } from '../enum/disposal-count.enum';

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
}
