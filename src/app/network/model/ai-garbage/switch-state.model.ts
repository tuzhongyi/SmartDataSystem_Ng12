import { IModel } from '../model.interface';

export class SwitchState implements IModel {
  /**	Int32	编号，从1开始	M */
  No!: number;
  /**	Boolean	状态，false：关闭，true：开启	M	*/
  State!: boolean;
  /**	String	开关名称	M	*/
  Name!: string;
}
