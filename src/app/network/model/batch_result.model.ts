import { SingleResultType } from '../../enum/single_result_type.enum';

/** 批量操作结果 */
export class BatchResult {
  /**	SingleResult[]	操作结果	O */
  Results?: SingleResult[];
}
/** 单个操作结果 */
export interface SingleResult {
  /**	String	资源ID	M */
  ResourceId: string;
  /**	Int32	结果：0-成功，1-失败	M */
  Result: SingleResultType;
  /**	String	描述信息	O */
  ResultDescription?: string;
}
