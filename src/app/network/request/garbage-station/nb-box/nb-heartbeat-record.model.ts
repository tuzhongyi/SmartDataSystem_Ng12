import { Transform } from 'class-transformer';
import { IModel } from 'src/app/network/model/model.interface';
import { transformDateTime } from 'src/app/network/model/transform.model';

/**	NBHeartbeatRecord (NB电源箱心跳记录)	*/
export class NBHeartbeatRecord implements IModel {
  /**	DateTime	心跳时间	M	*/
  @Transform(transformDateTime)
  HeartbeatTime!: Date;
  /**	Int32	信号强度，0-无信号，[0-100]数值越大信号越强	O	*/
  Signal?: number;
  /**	Double	温度（无效）	O	*/
  Temperature?: number;
  /**
   * 	Int32
   * 	NB电源箱状态，
   *  0：正常
   *  1：故障
   *  2：220V故障
   * 	O
   **/
  State?: number;
  /**	Int32	220V电源状态：0-无 1-有 2-重启测试	O	*/
  V220?: number;
  /**	Int32	12V电压百分比：0-100	O	*/
  V12?: number;
}
