import { IModel } from '../model.interface';
import { IPEndPoint } from './ip-end-point.model';

/**	DeviceSession (设备会话)	*/
export class DeviceSession implements IModel {
  /**	String	设备唯一ID标识符	M	*/
  DeviceId!: string;
  /**	String	会话ID	M	*/
  SessionId!: string;
  /**	String	设备名称	O	*/
  DeviceName?: string;
  /**	String	服务器HTTP主机地址	M	*/
  HttpHost!: string;
  /**	Int32	服务器HTTP端口号	M	*/
  HttpPort!: number;
  /**	IPEndPoint	设备本地代理的IP地址和端口号	O	*/
  Forwarding?: IPEndPoint;
}
