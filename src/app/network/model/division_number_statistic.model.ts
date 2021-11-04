import { EventNumber } from './event_number.model';

/** 区划的数量统计信息 */
export class DivisionNumberStatistic {
  /**	String	区划ID	M */
  Id!: string;
  /**	String	区划名称	M */
  Name!: string;
  /**	Int32	垃圾房数量	M */
  StationNumber!: number;
  /**	Int32	摄像机数量	M */
  CameraNumber!: number;
  /**	Int32	离线摄像机数量	M */
  OfflineCameraNumber!: number;
  /**	Int32	垃圾桶数量	M */
  TrashCanNumber!: number;
  /**	Int32	下一层区划数量	M */
  ChildDivisionNumber!: number;
  /**	Int32	叶区划数量	M */
  LeafDivisionNumber!: number;
  /**	Int32	干垃圾满溢垃圾房数量	M */
  DryFullStationNumber!: number;
  /**	Int32	湿垃圾满溢垃圾房数量	M */
  WetFullStationNumber!: number;
  /**
   * 	EventNumber[]	当日事件数量
   *  1-乱丢垃圾
   *  2-混合投放
   *  5-小包垃圾落地
   *  6-小包垃圾滞留
   *  7-小包垃圾处置完成	O
   */
  TodayEventNumbers?: EventNumber[];

  /**	Double	当天总数量，单位：L	M */
  DayVolume!: number;
  /**	Double	当天干垃圾容量，单位：L	M */
  DayDryVolume!: number;
  /**	Double	当天湿垃圾容量，单位：L	M */
  DayWetVolume!: number;
  /**	Int32	垃圾滞留点数量	O */
  GarbageDropStationNumber?: number;
  /**	Int32	总处理任务数量	O */
  TotalTaskCount?: number;
  /**	Int32	完成任务数量	O */
  CompleteTaskCount?: number;
  /**	Int32	未完成任务数量	O */
  TimeoutTaskCount?: number;
  /**	Double	当前垃圾堆滞留时间，单位：分钟，区划下当前最大时长	O */
  CurrentGarbageTime?: number;
}
