import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/**	NB传感器状态	*/
export class NBStatus implements IModel {
  /**	Double	电量：0-100	O	*/
  Battery?: number;
  /**	Double	信号强度：0-100	O	*/
  Signal?: number;
  /**	Int32	12V上电情况，0：断电，1：上电	O	*/
  DC12V?: number;
  /**	Double	温度，单位：摄氏度	O	*/
  Temperature?: number;
  /**	DateTime	最后一次心跳时间	M	*/
  @Transform(transformDateTime)
  LastHeartbeatTime!: Date;
}
