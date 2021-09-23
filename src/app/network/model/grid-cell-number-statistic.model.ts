import { EventNumber } from './event-number.model';

/** 网格单元的数量统计信息 */
export interface GridCellNumberStatistic {
  /**	String	网格单元ID	M */
  Id: string;
  /**	String	网格单元名称	M */
  Name: string;
  /**	Int32	垃圾房数量	M */
  StationNumber: number;
  /**	Int32	摄像机数量	M */
  CameraNumber: number;
  /**	Int32	离线摄像机数量	M */
  OfflineCameraNumber: number;
  /**	Int32	垃圾桶数量	M */
  TrashCanNumber: number;
  /**	Int32	干垃圾满溢垃圾房数量	M */
  DryFullStationNumber: number;
  /**	Int32	湿垃圾满溢垃圾房数量	M */
  WetFullStationNumber: number;
  /**	EventNumber[]	当日事件数量	O */
  TodayEventNumbers?: EventNumber[];
  /**	Double	当天总数量，单位：L	M */
  DayVolume: number;
  /**	Double	当天干垃圾容量，单位：L	M */
  DayDryVolume: number;
  /**	Double	当天湿垃圾容量，单位：L	M */
  DayWetVolume: number;
  /**	Int32	垃圾滞留点数量	O */
  GarbageDropStationNumber?: number;
}
