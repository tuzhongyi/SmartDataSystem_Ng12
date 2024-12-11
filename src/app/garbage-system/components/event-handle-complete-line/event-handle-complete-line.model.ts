import { IEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-event-record.model';

export interface IEventHandleCompleteLineConverter {
  convert(data: IEventRecord): EventHandleCompleteLineModel[];
}
export class EventHandleCompleteLineModel {
  value = 0;
  name = '';
}
