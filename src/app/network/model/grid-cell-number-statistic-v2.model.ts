import { EventNumber } from './event-number.model';
import { StatisticTime } from './statistic-time.model';

/** 网格单元的数量统计信息 */
export class GridCellNumberStatisticV2 {
  /**	String	网格单元ID	M */
  Id!: string;
  /**	String	网格单元名称	M */
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
}
