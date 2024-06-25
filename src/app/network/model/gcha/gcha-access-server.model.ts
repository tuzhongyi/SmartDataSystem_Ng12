import { IIdNameModel } from '../model.interface';

/**	AccessServer(接入服务器)	*/
export class GCHAAccessServer implements IIdNameModel {
  /**	String	服务器Id	M	*/
  Id!: string;
  /**	String	服务器名称	M	*/
  Name!: string;
  /**
   * String	接入节点地址：
   * coap://ip:port/
   * M
   **/
  AccessAddress!: string;
  /**
   * String	接入HTTP节点地址：
   * http://ip:port/G
   * M
   **/
  AccessHttpAddress!: string;
  /**
   * String	接入协议类型：
   * CoAP+CBOR
   * CoAP+JSON
   * M
   **/
  ProtocolType!: string;
  /**	Int32	最大接入设备数量	M	*/
  MaxAccessNumber!: number;
  /**	Int32	当前接入数量	O	*/
  CurrentAccessNumber?: number;
  /**	String	Http2Tcp服务地址	O	*/
  Http2TcpAddress?: string;
}
