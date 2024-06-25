import { IIdModel } from '../model.interface';

/**	Robot (机器人信息)	*/
export class GCHARobot implements IIdModel {
  /**	String	机器人唯一ID，创建后必填	M	*/
  Id!: string;
  /**	String	机器人名称	O	*/
  Name?: string;
  /**	String	型号：GCRA01	O	*/
  Model?: string;
  /**	String	序列号：HW-GCRA01-00001（唯一）	M	*/
  SerialNumber!: string;
  /**	String	设备类型：GCRA	M	*/
  DeviceType!: string;
  /**	String	软件版本号 1.0.0	O	*/
  FirmwareVersion?: string;
  /**	Date	编译时间	O	*/
  FirmwareBuildDate?: Date;
  /**	String	公司名	O	*/
  Company?: string;
  /**	String	操作系统	O	*/
  OS?: string;
  /**	String	硬件类型、芯片型号	O	*/
  Hardware?: string;
  /**	String	硬件版本号	O	*/
  HardwareVersion?: string;
  /**	String	供应商信息	O	*/
  Vendor?: string;
  /**	String	自定义信息	O	*/
  CustomizedInfo?: string;
  /**	String	协议类型，CoAP	M	*/
  ProtocolType!: string;
  /**	String	设备IP地址：192.168.1.2	M	*/
  HostAddress!: string;
  /**	Int32	设备端口号	M	*/
  PortNo!: number;
}
