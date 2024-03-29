import { IModel } from '../model.interface';

/**	IPEndPoint (IP地址和端口号)	*/
export class IPEndPoint implements IModel {
  /**	String	本地设备IP地址	M	*/
  Address!: string;
  /**	Int32	本地设备端口号	M	*/
  Port!: number;
}
