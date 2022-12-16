import { EventNumber } from './event-number.model';
import { Model } from './model.interface';
import { StatisticTime } from './statistic-time.model';

/** 垃圾房的数量统计信息 */
export class GarbageStationNumberStatisticV2 extends Model {
  /**	String	垃圾房ID	M */
  Id!: string;
  /**	String	垃圾房名称	M */
  Name!: string;
  /**	StatisticTime	统计时间对象	M */
  Time!: StatisticTime;
  /**	EventNumber[]	当日事件数量	O */
  EventNumbers?: EventNumber[];
  /**	Double	总数量，单位：L	O */
  Volume?: number;
  /**	Double	干垃圾容量，单位：L	O */
  DryVolume?: number;
  /**	Double	湿垃圾容量，单位：L	O */
  WetVolume?: number;
  /**	Int32	评级	O */
  Garde?: number;
  /**	Int32	满溢时间，单位：分钟	O */
  FullDuration?: number;
  /**	Double	垃圾滞留比值 有垃圾时长/没有垃圾的时长	O */
  GarbageRatio?: number;
  /**	Double	垃圾堆平均滞留时间，单位：分钟	O */
  AvgGarbageTime?: number;
  /**	Double	垃圾堆最大滞留时间，单位：分钟	O */
  MaxGarbageTime?: number;
  /**	Int32	当日最大滞留堆数量	O */
  MaxGarbageCount?: number;
  /**	Double	有垃圾时长，单位：分钟	O */
  GarbageDuration?: number;
  /**	Double	无垃圾时长，单位：分钟	O */
  CleanDuration?: number;
  /**	Int32	总处理任务数量	O */
  TotalTaskCount?: number;
  /**	Int32	完成任务数量	O */
  CompleteTaskCount?: number;
  /**	Int32	未完成任务数量	O */
  TimeoutTaskCount?: number;
}
