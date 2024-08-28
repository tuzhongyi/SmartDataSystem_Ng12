import { Transform } from 'class-transformer';
import { IIdModel } from '../../model.interface';
import { transformDateTime, transformRound } from '../../transform.model';

/**	NBStatus (NB电源箱状态)	*/
export class NBStatus implements IIdModel {
  /**	String	NB电源箱唯一ID	M	*/
  Id!: string;
  /**	Int32	信号强度，0-无信号，[0-100]数值越大信号越强	O	*/
  Signal?: number;
  /**	Double	温度（无效）	O	*/
  @Transform((value) => transformRound(value, 1))
  Temperature?: number;
  /**
   *  Int32
   * 	NB电源箱状态，
   *  0：正常
   *  1：故障
   *  2：220V故障
   * 	O
   **/
  State?: number;
  /**	DateTime	最后一次的心跳时间	O	*/
  @Transform(transformDateTime)
  HeartbeatTime?: Date;
  /**	DateTime	匹配按钮触发时间	O	*/
  @Transform(transformDateTime)
  PressTime?: Date;
  /**	DateTime	重启命令发送时间	O	*/
  @Transform(transformDateTime)
  RestartTime?: Date;
  /**	Int32	220V电源状态：0-无 1-有 2-重启测试	O	*/
  V220?: number;
  /**	Int32	12V电压百分比：0-100	O	*/
  V12?: number;
}
