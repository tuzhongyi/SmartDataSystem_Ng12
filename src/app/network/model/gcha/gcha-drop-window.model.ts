import { IModel } from '../model.interface';

/**	DropWindow (投放窗口信息)	*/
export class GCHADropWindow implements IModel {
  /**	Int32	投放窗口编号从1开始	M	*/
  No!: number;
  /**
   * Int32
   * 窗口类型：
   * 0:其他
   * 1:干垃圾
   * 2:湿垃圾桶
   * 3:可回收垃圾桶
   * 4:有害垃圾桶
   * M
   **/
  DropType!: number;
  /**	String	投放窗口名称	O	*/
  Name?: string;
}
