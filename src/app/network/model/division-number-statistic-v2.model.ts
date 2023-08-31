import { Type } from 'class-transformer';
import 'reflect-metadata';
import { EventNumber } from './event-number.model';
import { GarbageWeight } from './garbage-weight.model';
import { Level3Statistic } from './level-3-statistic.model';
import { IdNameModel } from './model.interface';
import { StatisticTime } from './statistic-time.model';

/** 区划的数量统计信息 */
export class DivisionNumberStatisticV2 extends IdNameModel {
  /**	String	区划ID	M */
  Id!: string;
  /**	String	区划名称	M */
  Name!: string;
  /**	StatisticTime	统计时间对象	M */
  Time!: StatisticTime;
  /**
   * 	EventNumber[]	当日事件数量
   *  1-乱丢垃圾
   *  2-混合投放
   *  5-小包垃圾落地
   *  6-小包垃圾滞留
   *  7-小包垃圾处置完成	O
   */
  EventNumbers?: EventNumber[];
  /**	Double	总数量，单位：L	O */
  Volume?: number;
  /**	Double	干垃圾容量，单位：L	O */
  DryVolume?: number;
  /**	Double	湿垃圾容量，单位：L	O */
  WetVolume?: number;
  /**	Int32	总处理任务数量	O */
  TotalTaskCount?: number;
  /**	Int32	完成任务数量	O */
  CompleteTaskCount?: number;
  /**	Int32	未完成任务数量	O */
  TimeoutTaskCount?: number;
  /**	GarbageWeight[]	当日垃圾重量	O */
  @Type(() => GarbageWeight)
  GarbageWeights?: GarbageWeight[];

  /**	Level3Statistic	三级事件统计数据	O */
  @Type(() => Level3Statistic)
  Level3Statistic?: Level3Statistic;
}
