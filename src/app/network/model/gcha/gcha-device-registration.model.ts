import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/**	DeviceRegistration  (设备注册信息)	*/
export class GCHADeviceRegistration implements IModel {
  /**	String	设备ID	M	*/
  DeviceId!: string;
  /**	String	设备名称	O	*/
  DeviceName?: string;
  /**	String	序列号：HW-GCHA01-00001	O	*/
  SerialNumber?: string;
  /**	String	设备类型：GCHA	O	*/
  DeviceType?: string;
  /**	String	供应商信息	O	*/
  Vendor?: string;
  /**	String	自定义信息	O	*/
  CustomizedInfo?: string;
  /**	String	接入服务器Id	M	*/
  AccessServerId!: string;
  /**	String	接入节点地址：coap://ip:port/gcha/	O	*/
  AccessAddress?: string;
  /**	String	接入HTTP节点地址：http://ip:port/G	O	*/
  AccessHttpAddress?: string;
  /**
   * String
   * 接入协议类型：
   * CoAP+CBOR
   * CoAP+JSON
   * O
   **/
  ProtocolType?: string;
  /**	DateTime	注册时间	M	*/
  @Transform(transformDateTime)
  RegistrationTime!: Date;
  /**	DateTime	过期时间有效期	M	*/
  @Transform(transformDateTime)
  ExpiredTime!: Date;
  /**	String	接入Token	M	*/
  AccessToken!: string;
  /**	String	Http2Tcp地址	O	*/
  Http2TcpAddress?: string;
}
