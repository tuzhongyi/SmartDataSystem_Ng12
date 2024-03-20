import { Transform } from 'class-transformer';
import { BatteryState } from 'src/app/enum/ai-garbage/battery-state.enum';
import { RobotState } from 'src/app/enum/ai-garbage/robot-state.enum';
import { IModel } from '../model.interface';
import { transformBinary } from '../transform.model';
import { DeviceError } from './device-error.model';

/**	RobotStatus	*/
export class RobotStatus implements IModel {
  /**	String	机器人序列号	O	*/
  SerialNumber?: string;
  /**
   * Int32	设备状态，
   * None：无
   * Busy：繁忙状态
   * Charging：充电状态
   * LoBAT：低电量
   * Error：故障
   * Upgrading：升级中
   * Offline：信号丢失（离线）
   * 如果多个状态同时存在，则使用|分割
   * M
   **/
  @Transform(transformBinary)
  State!: RobotState[];
  /**
   * Int32	电池状态：
   * Normal：正常
   * Charging：充电中
   * Unable：无法充电
   * UnderVoltage：欠压、亏电
   * O
   **/

  BatteryState?: BatteryState;
  /**	Int32	剩余百分比[0-100]	O	*/
  BatteryLevel?: number;
  /**	String	型号	O	*/
  Model?: string;
  /**	DeviceError[]	错误码	O	*/
  Errors?: DeviceError[];
}
