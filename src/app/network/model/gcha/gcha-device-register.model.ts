import { IModel } from '../model.interface';

/**	DeviceRegister (设备注册请求)	*/
export class GCHADeviceRegister implements IModel {
  /**	String	设备ID	M	*/
  DeviceId!: string;
  /**	String	密钥，BASE64(SM4()),默认密钥：howell1409	M	*/
  DeviceKey!: string;
  /**	String	设备名称	M	*/
  DeviceName!: string;
  /**	String	序列号：HW-GCHA01-00001	M	*/
  SerialNumber!: string;
  /**	String	设备类型：GCHA	M	*/
  DeviceType!: string;
  /**	String	供应商信息	O	*/
  Vendor?: string;
  /**	String	自定义信息	O	*/
  CustomizedInfo?: string;
}
