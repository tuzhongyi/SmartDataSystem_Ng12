import { IdNameModel } from './model.interface';

/** 事件数量总和 */
export class SumEventNumber extends IdNameModel {
  /**	String	排名对象ID	M */
  Id!: string;
  /**	String	排名对象名称	M */
  Name!: string;
  /**	Int32	总事件数量	M */
  TotalNumber!: number;
}
