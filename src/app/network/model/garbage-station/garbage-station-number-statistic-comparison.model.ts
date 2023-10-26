import { EventType } from '../../../enum/event-type.enum';
import { IdNameModel } from '../model.interface';
import { StatisticTime } from './statistic-time.model';

/** 垃圾房比较数据 */
export class GarbageStationNumberStatisticComparison extends IdNameModel {
  /**	String	垃圾房ID	M */
  Id!: string;
  /**	String	垃圾房名称	M */
  Name!: string;
  /**	StatisticTime	统计时间对象	M */
  Time!: StatisticTime;
  /**	EventNumberComparison[]	当日事件数量差量百分比±0%-1000%	O */
  EventNumbers?: EventNumberComparison;
  /**	Double	差量百分比±0%-1000%	O */
  Volume?: number;
  /**	Double	差量百分比±0%-1000%	O */
  DryVolume?: number;
  /**	Double	差量百分比±0%-1000%	O */
  WetVolume?: number;
  /**	Double	差量百分比±0%-1000%	O */
  FullDuration?: number;
  /**	Double	差量百分比±0%-1000%	O */
  GarbageRatio?: number;
  /**	Double	差量百分比±0%-1000%	O */
  AvgGarbageTime?: number;
  /**	Double	差量百分比±0%-1000%	O */
  MaxGarbageTime?: number;
  /**	Double	差量百分比±0%-1000%	O */
  MaxGarbageCount?: number;
  /**	Double	差量百分比±0%-1000%	O */
  GarbageDuration?: number;
  /**	Double	差量百分比±0%-1000%	O */
  CleanDuration?: number;
}

/** 垃圾房比较数据 */
export interface EventNumberComparison {
  /**	Int32	事件类型	M */
  EventType: EventType;
  /**	Int32	差量百分比±0%-1000%	O */
  Number?: number;
}
