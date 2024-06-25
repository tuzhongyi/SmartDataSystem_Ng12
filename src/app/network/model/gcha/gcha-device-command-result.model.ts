import { IModel } from '../model.interface';

/**	DeviceCommandResult (下发命令执行结果)	*/
export class GCHADeviceCommandResult implements IModel {
  /**	Int32	命令ID	M	*/
  Id!: number;
  /**	String[]	命令参数	O	*/
  Arguments?: string[];
  /**	Int32	错误码间附录3.3	M	*/
  FaultCode!: number;
  /**	String	错误原因	O	*/
  FaultReason?: string;
}
