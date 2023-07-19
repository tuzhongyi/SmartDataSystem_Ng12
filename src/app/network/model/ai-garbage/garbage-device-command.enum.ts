export enum AIGarbageDeviceCommandNo {
  /** 	同步RFID卡号	1	*/
  SyncRfidCard = 1,
  /** 	自动程序升级检测	2	*/
  UpgradeCheck = 2,
  /** 	系统自检，并上报结果	5	*/
  SelfCheck = 5,
  /** 	重启系统	6	*/
  Reboot = 6,
  /** 	手动开关排风扇	10	*/
  ExhaustFan = 10,
  /** 	手动开关香氛喷洒	11	*/
  Spray = 11,
  /** 	设备信息同步	14	*/
  DeviceInformation = 14,
  /** 投放窗口上电	参数1：投放窗口编号[1-16] 15 */
  WindowPowerOn = 15,
}
export class AIGarbageDeviceCommand {
  /**	Int32	命令编号	M */
  CommandNo!: AIGarbageDeviceCommandNo;
  /**	Int32	参数1	O */
  Parameter?: number;
}
