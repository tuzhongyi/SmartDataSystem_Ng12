import { IModel } from '../model.interface';

/**	DeviceCommand (下发命令)	*/
export class GCHADeviceCommand implements IModel {
  /**	Int32	命令ID	M	*/
  Id!: number;
  /**	String[]	命令参数	O	*/
  Arguments?: string[];
}
