import { IIdModel } from '../model.interface';
import { Schedule } from '../schedule.model';
import { GCHACamera } from './gcha-camera.model';
import { GCHADropWindow } from './gcha-drop-window.model';

/**	DeviceInfo (设备信息)	*/
export class GCHADeviceInfo implements IIdModel {
  /**	String	设备唯一ID标识符	M	*/
  Id!: string;
  /**	String	设备名称	O	*/
  Name?: string;
  /**	String	垃圾厢房ID	O	*/
  GarbageStationId?: string;
  /**	String	垃圾厢房名称	O	*/
  GarbageStationName?: string;
  /**	String	所属区域ID(小区)	O	*/
  RegionId?: string;
  /**	String	所属区域名称(小区)	O	*/
  RegionName?: string;
  /**	String	设备型号	O	*/
  Model?: string;
  /**
   * Int32
   * 软件版本号
   * 高1字节为主版本号，第二个2字节为次版本号。
   * 如0x01010000即1.1版本
   * O
   **/
  SoftwareVersion?: number;
  /**
   * Int32
   * 硬件版本号
   * 高1字节为主版本号，第二个2字节为次版本号。
   * 如0x01010000即1.1版本
   * O
   **/
  HardwareVersion?: number;
  /**	Int32	协议版本号，如0x01000000即1.0	O	*/
  ProtoVersion?: number;
  /**	Boolean	是否需要升级，true：需要 使用UpgradeAddress地址下载升级包	O	*/
  NeedUpgrade?: boolean;
  /**	String	FTP服务器地址	O	*/
  FTPAddress?: string;
  /**	String	升级文件地址	O	*/
  UpgradeAddress?: string;
  /**	DropWindow[]	投放窗口信息	O	*/
  DropWindows?: GCHADropWindow[];
  /**	Int32	Rfid上限数量	O	*/
  MaxRfidNumber?: number;
  /**	Camera[]	摄像机信息	O	*/
  Cameras?: GCHACamera[];
  /**	Schedule	工作表	O	*/
  Schedule?: Schedule;
  /**	Int32	心跳间隔，单位：秒	O	*/
  HeartbeatInterval?: number;
  /**	String	设备序列号（唯一）	O	*/
  SerialNumber?: string;
}
