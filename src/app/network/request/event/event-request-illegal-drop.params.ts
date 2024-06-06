import { GetEventRecordsParams } from './event-request.params';

export class GetEventRecordIllegalDropParams extends GetEventRecordsParams {
  /**	Int32[]	过滤事件类型	O */
  EventTypes?: number[];
}
