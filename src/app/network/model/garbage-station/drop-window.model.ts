import { IModel } from '../model.interface';

export class DropWindow implements IModel {
  /**	Int32	投放窗口编号从1开始	M	*/
  No!: number;
  /**	Int32	"窗口类型：
      0:其他
      1:干垃圾
      2:湿垃圾桶
      3:可回收垃圾桶
      4:有害垃圾桶"	M	
  */
  DropType!: number;
  /**	String	投放窗口名称	O	*/
  Name?: string;
  /**	Int32	"抓手复位状态 0:正常、1:异常"	O	*/
  GripperState?: number;
  /**	Double	每个桶的重量(单位：KG)，无读数请给0或null	O	*/
  Weight?: number;
  /**	Int32	"分类平台(翻板)翻转状态 0:正常、1:异常"	O	*/
  PlateTurningState?: number;
  /**	Int32	"窗口开关功能状态 0:正常、1:异常、2:常开"	O	*/
  WindowState?: number;
  /**	Int32	"垃圾是否满溢状态 0:未满溢、1:满溢"	O	*/
  GarbageFull?: number;
}
