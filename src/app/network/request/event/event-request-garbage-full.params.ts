import { GetEventRecordsParams } from './event-request.params';

export class GetEventRecordGarbageFullParams extends GetEventRecordsParams {
  /**	Boolean	是否已处置	O */
  IsHandle?: boolean;
  /**	Boolean	处置人员是否已处置	O */
  Processed?: boolean;
  /**	String	处置人员名称	O */
  ProcessorName?: string;
  /**	String	手机号码	O */
  ProcessorMobileNo?: string;
  /**	String	处置描述	O */
  ProcessDescription?: string;
  /**	Int32[]	过滤事件类型	O */
  EventTypes?: number[];
}
