import { IModel } from '../../model.interface';

/**	GarbageStationAbnormalsStatistic (垃圾箱的异常或故障统计)	*/
export class GarbageStationAbnormalStatistic implements IModel {
  /**	Int32	N小时内：GCHA离线设备数量	M	*/
  GCHAOfflineNumber: number = 0;
  /**	Int32	N小时内：自动门设备离线数量	M	*/
  DoorOfflineNumber: number = 0;
  /**	Int32	N小时内：NB电源箱无心跳数量	M	*/
  NBOfflineNumber: number = 0;
}
