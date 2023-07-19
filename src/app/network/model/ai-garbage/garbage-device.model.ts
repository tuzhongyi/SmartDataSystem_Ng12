import { Transform, Type } from 'class-transformer';
import { IdModel } from '../model.model';
import { PagedList } from '../page_list.model';
import { transformDateTime, transformVersion } from '../transform.model';
import { AIGarbageCamera } from './camera.model';
import { AIGarbageDropWindow } from './drop-window.model';
import { AIGarbageDeviceCapabilities } from './garbage-device-capabilities.model';
import { AIGarbageDeviceStatus } from './garbage-device-status.model';
import { AIGarbageSchedule } from './schedule.model';

export class AIGarbageDevice extends IdModel {
  /**	String	设备密钥，服务器端和设备端的密钥必须匹配；默认：Howell1409	M	*/
  Secret!: string;
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
  /**	Int32	软件版本号；高1字节为主版本号，第二个2字节为次版本号。如0x01010000即1.1版本	O	*/
  @Transform(transformVersion)
  SoftwareVersion?: string;
  /**	Int32	硬件版本号高1字节为主版本号，第二个2字节为次版本号。如0x01010000即1.1版本	O	*/
  @Transform(transformVersion)
  HardwareVersion?: string;
  /**	Int32	协议版本号，如0x01000000即1.0	O	*/
  @Transform(transformVersion)
  ProtoVersion?: string;
  /**	Boolean	是否需要升级，true：需要 使用UpgradeAddress地址下载升级包	O	*/
  NeedUpgrade?: boolean;
  /**	String	FTP服务器地址	O	*/
  FTPAddress?: string;
  /**	String	升级文件地址	O	*/
  UpgradeAddress?: string;
  /**	Int32	投放窗口数量	O	*/
  DropWindowNumber?: number;
  /**	DropWindow[]	投放窗口信息	O	*/
  @Type(() => AIGarbageDropWindow)
  DropWindows?: AIGarbageDropWindow[];
  /**	Int32	Rfid上限数量	O	*/
  MaxRfidNumber?: number;
  /**	Int32	摄像机数量	O	*/
  CameraNumber?: number;
  /**	Camera[]	摄像机信息	O	*/
  @Type(() => AIGarbageCamera)
  Cameras?: AIGarbageCamera[];
  /**	DeviceCapabilities	设备能力	O	*/
  @Type(() => AIGarbageDeviceCapabilities)
  Capabilities?: AIGarbageDeviceCapabilities;
  /**	GarbageDeviceStatus	设备状态	O	*/
  @Type(() => AIGarbageDeviceStatus)
  Status?: AIGarbageDeviceStatus;
  /**	Schedule	工作表	O	*/
  @Type(() => AIGarbageSchedule)
  Schedule?: AIGarbageSchedule;

  /**	Int32	心跳间隔，单位：秒	O */
  HeartbeatInterval?: number;

  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreationTime?: Date;
  /**	DateTime	变更时间	O	*/
  @Transform(transformDateTime)
  UpdateTime?: Date;
}
export class PagedListAIGarbageDevice extends PagedList<AIGarbageDevice> {
  @Type(() => AIGarbageDevice)
  Data!: AIGarbageDevice[];
}
