import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';
import { GCHACamera } from './gcha-camera.model';
import { GCHAGarbageWeight } from './gcha-garbage-weight.model';
import { GCHARobotStatus } from './gcha-robot-status.model';
import { GCHASortationStatus } from './gcha-sortation-status.model';

/**	DeviceHeartbeat (设备心跳数据)	*/
export class DeviceHeartbeat implements IModel {
  /**
   * String
   * 按位从低到高依次：
   * 排风扇(ExhaustFan)
   * 0：关闭，1：开启
   * RFID读卡器(RfidReader)
   * 0:正常、1:异常
   * 香氛喷洒(Spray)
   * 0：关闭，1：开启
   * 如：
   * 100表示：排风扇：0，
   * RFID读取卡：0，香氛：1	O	*/
  SensorState?: string;
  /**
   * String
   * 拨位开关状态
   * 00000000，共8位00000001，表示1号开关处于开启状态
   * 00000010，表示2号开关处于开启状态，1号开关处于关闭状态。
   * 1号：强制门常开状态，0-关闭，1-开启
   * 2号：RFID刷卡器启用状态，0-关闭，1-开启
   * 没有的位数，默认填0
   * O
   **/
  SwitchState?: string;
  /**	Int32	投放窗口数量	O	*/
  WindowNumber?: number;
  /**
   * String
   * 投放窗口状态：
   * 0000000000000000，共16位
   * 每位状态：0:正常、1:异常、2-常开
   * 0000000000000201,表示
   * 窗口1号，异常。
   * 窗口2号，正常。
   * 窗口3号，常开。
   * O
   **/
  WindowState?: string;
  /**	RobotStatus[]	机器人信息和状态	O	*/
  Robots?: GCHARobotStatus[];
  /**	DateTime	系统时间：	M	*/
  @Transform(transformDateTime) SystemTime!: Date;
  /**
   * String
   * 按位从低到高依次：
   * 分析服务状态，0-正常，1-离线
   * 升级服务状态：0-正常，1-离线
   * O
   **/
  ServerState?: string;
  /**	Camera[]	摄像机状态	O	*/
  Cameras?: GCHACamera[];
  /**	GarbageWeight[]	垃圾重量	O	*/
  Weights?: GCHAGarbageWeight[];
  /**	Int32	满溢垃圾桶数量	O	*/
  FullCount?: number;
  /**	Double	CPU芯片温度，单位：摄氏度	O	*/
  ChipTemperature?: number;
  /**	SortationStatus[]	分拣设备状态	O	*/
  Sortations?: GCHASortationStatus[];
  /**	String	版本号	O	*/
  Version?: string;
  /**
   * Int32
   * 设备能力
   * 最低位：1:滞留事件上传。
   * O
   **/
  Capability?: number;
}
