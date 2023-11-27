import { PagedDurationParams } from '../../../IParams.interface';

export class GetResourceCameraDailyAICountParams extends PagedDurationParams {
  /**	String[]	摄像机ID	O	*/ CameraIds?: string[];
  /**	String	摄像机名称	O	*/ CameraName?: string;
  /**	Int32	数量小于某值	O	*/ CountLessThan?: number;
  /**	Int32	数量大于某值	O	*/ CountGreaterThan?: number;
  /**	String	升序字段	O	*/ Asc?: string;
  /**	String	降序字段	O	*/ Desc?: string;
}
