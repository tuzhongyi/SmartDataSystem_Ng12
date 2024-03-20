import { DeviceCommand } from '../garbage-station/device-command.model';

export enum AIGarbageDeviceCommandNo {
  /** 	同步RFID卡号	1	*/
  SyncRfidCard = 1,
  /** 	自动程序升级检测	2	*/
  UpgradeCheck = 2,
  /** 	系统自检，并上报结果	5	*/
  SelfCheck = 5,
  /** 	重启系统	6	*/
  Reboot = 6,
  /** 	手动开关排风扇	9	*/
  TCPConnection = 9,
  /** 	开启TCP连接	10	*/
  ExhaustFan = 10,
  /** 	手动开关香氛喷洒	11	*/
  Spray = 11,
  /** 	设备信息同步	14	*/
  DeviceInformation = 14,
  /** 投放窗口上电	参数1：投放窗口编号[1-16] 15 */
  WindowPowerOn = 15,
  /**	22	GCHA自动程序升级检测 */
  GCHAUpgradeCheck = 22,
  /**	26	重启系统	 */
  GCHAReboot = 26,
  /**	29	开启TCP连接	参数1时长，单位：分钟 */
  GCHATCP = 29,
}
export class AIGarbageDeviceCommand extends DeviceCommand {
  /**	Int32	命令编号	M */
  CommandNo!: AIGarbageDeviceCommandNo;
}
