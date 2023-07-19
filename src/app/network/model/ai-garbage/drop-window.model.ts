import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

export class AIGarbageDropWindow implements IModel {
  /**	Int32	投放窗口编号从1开始	M	*/
  No!: number;
  /**	Int32	窗口类型：0:其他;1:干垃圾;2:湿垃圾桶;3:可回收垃圾桶;4:有害垃圾桶	M	*/
  DropType!: AIGarbageDropWindowType;
  /**	String	投放窗口名称	O	*/
  Name?: string;
  /**	Int32	抓手复位状态；0:正常、1:异常	O	*/
  GripperState?: number;
  /**	Double	每个桶的重量(单位：KG)，无读数请给0或null	O	*/
  Weight?: number;
  /**	Int32	分类平台(翻板)翻转状态0:正常、1:异常	O	*/
  PlateTurningState?: number;
  /**	Int32	窗口开关功能状态0:正常、1:异常	O	*/
  WindowState?: number;
  /**	Int32	垃圾是否满溢状态0:未满溢、1:满溢	O	*/
  GarbageFull?: number;
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreationTime?: Date;
  /**	DateTime	变更时间	O	*/
  @Transform(transformDateTime)
  UpdateTime?: Date;
}
export enum AIGarbageDropWindowType {
  /** 0:其他 */
  Other = 0,
  /** 1:干垃圾 */
  DryGarbage = 1,
  /** 2:湿垃圾桶 */
  WetGarbage = 2,
  /** 3:可回收垃圾桶 */
  RecyclableGarbage = 3,
  /** 4:有害垃圾桶 */
  HazardousGarbage = 4,
}
