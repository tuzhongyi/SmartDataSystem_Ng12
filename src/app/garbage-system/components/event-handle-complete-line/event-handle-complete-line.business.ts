import { Injectable } from '@angular/core';
import { IEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-event-record.model';
import { EventHandleCompleteLineConverter } from './converter/event-handle-complete-line.converter';

@Injectable()
export class EventHandleCompleteLineBusiness {
  private converter = new EventHandleCompleteLineConverter();
  load(data: IEventRecord) {
    return this.converter.convert(data);
  }
}
