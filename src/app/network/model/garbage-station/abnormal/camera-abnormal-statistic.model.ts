import { IModel } from '../../model.interface';

/**	CameraAbnormalsStatistic (摄像机的异常或故障统计)	*/
export class CameraAbnormalStatistic implements IModel {
  /**	Int32	N 小时内：摄像机离线数量	M	*/
  CameraOfflineNumber: number = 0;
  /**	Int32	N 小时内：摄像机故障数量	M	*/
  CameraAbnormalNumber: number = 0;
  /**	Int32	N小时内：摄像机录像故障数量	M	*/
  CameraRecordAbnormalNumber: number = 0;
}
