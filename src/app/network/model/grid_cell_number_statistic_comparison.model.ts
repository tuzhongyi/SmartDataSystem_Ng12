import { EventNumberComparison } from './garbage_station_number_statistic_comparison.model';
import { StatisticTime } from './statistic_time.model';

/** 网格比较数据 */
export class GridCellNumberStatisticComparison {
  /**	String	区划ID	M */
  Id!: string;
  /**	String	区划名称	M */
  Name!: string;
  /**	StatisticTime	统计时间对象	M */
  Time!: StatisticTime;
  /**	EventNumberComparison[]	当日事件数量差量百分比±0%-1000%	O */
  EventNumbers?: EventNumberComparison[];
  /**	Double	差量百分比±0%-1000%	O */
  Volume?: number;
  /**	Double	差量百分比±0%-1000%	O */
  DryVolume?: number;
  /**	Double	差量百分比±0%-1000%	O */
  WetVolume?: number;
}
