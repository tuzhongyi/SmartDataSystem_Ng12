import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/**	DeviceAccessToken (设备接入Token信息)	*/
export class GCHADeviceAccessToken implements IModel {
  /**	String	设备ID	M	*/
  DeviceId!: string;
  /**	String	接入节点地址：coap://ip:port/gcha/devices/	M	*/
  AccessAddress!: string;
  /**	String	接入HTTP节点地址：http://ip:port/G	M	*/
  AccessHttpAddress!: string;
  /**
   * String	接入协议类型：
   * CoAP+CBOR
   * CoAP+JSON
   * M
   **/
  ProtocolType!: string;
  /**	DateTime	过期时间有效期	M	*/
  @Transform(transformDateTime)
  ExpiredTime!: Date;
  /**	String	接入Token	M	*/
  AccessToken!: string;
  /**	String	Http2Tcp地址	O	*/
  Http2TcpAddress?: string;
}
