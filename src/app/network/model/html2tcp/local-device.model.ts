import { IModel } from '../model.interface';
import { IPEndPoint } from './ip-end-point.model';

/**	LocalDevice (本地设备)	*/
export class LocalDevice implements IModel {
  /**	String	设备名称	O	*/
  DeviceName?: string;
  /**	String	设备类型，Camera，GCRA，GCHA，Router	M	*/
  DeviceType!: string;
  /**	IPEndPoint	IP地址和端口号	M	*/
  Forwarding!: IPEndPoint;
}
