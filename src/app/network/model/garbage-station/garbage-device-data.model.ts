import { Transform, Type } from 'class-transformer';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { GCHAStatus } from '../ai-garbage/gcha-status.model';
import { IModel } from '../model.interface';
import { transformDateTime, transformRound } from '../transform.model';
import { GarbageWeightV2 } from './garbage-weight-v2.model';
import { GarbageStationRobotStatus } from './robot-status.model';
import { GarbageStationSortationStatus } from './sortation-status.model';

export class GarbageDeviceData implements IModel {
  /**	String	设备ID	M	*/
  DeviceId!: string;
  /**	String	设备名称	M	*/
  DeviceName!: string;
  /**	Int32	"在线状态 0:正常、1:异常"	O	*/
  OnlineState?: OnlineStatus;
  /**	Int32	"排风扇开关状态 0:关闭、1:打开"	O	*/
  ExhaustFan?: number;
  /**	Double	气泵压强数值，单位：pa	O	*/
  AirPumpPressure?: number;
  /**	Int32	"气泵电源状态 0:断电、1:上电"	O	*/
  AirPumpPower?: number;
  /**	Int32	"RFID读卡器状态 0:正常、1:异常"	O	*/
  RfidReader?: number;
  /**	Int32	"大门开关状态 0:关闭、1:打开"	O	*/
  GateState?: number;
  /**	Int32	"香氛喷洒开关状态 0:关闭、1:打开"	O	*/
  Spray?: number;
  /**	Double	气体检测传感器数值	O	*/
  GasSensor?: number;
  /**	DateTime	最后更新时间	O	*/
  @Transform(transformDateTime)
  LastUpdateTime?: Date;
  /**	RobotStatus[]	机器人状态	O */
  @Type(() => GarbageStationRobotStatus)
  Robots?: GarbageStationRobotStatus[];
  /**	GCHAStatus	GCHA状态	O */
  GCHAStatus?: GCHAStatus;
  /**	GarbageWeightV2[]	垃圾重量	O */
  Weights?: GarbageWeightV2[];
  /**	Int32	满溢垃圾桶数量	O */
  FullCount?: number;
  /**	Double	CPU芯片温度，单位：摄氏度	O */
  @Transform((value) => transformRound(value, 1))
  ChipTemperature?: number;
  /**	SortationStatus[]	分拣设备状态	O */
  Sortations?: GarbageStationSortationStatus[];
}
