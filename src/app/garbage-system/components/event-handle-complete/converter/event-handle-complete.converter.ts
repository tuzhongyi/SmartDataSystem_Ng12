import { Injectable } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { IEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-event-record.model';
import { GarbageFullEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { MixedIntoEventRecord } from 'src/app/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { EventRecordCompleteModel } from '../event-handle-complete.model';
import { EventHandleCompleteService } from '../service/event-handle-complete.service';
import { EventHandleCompleteGarbageDropConverter } from './event-handle-complete-garbage-drop.converter';
import { EventHandleCompleteGarbageFullConverter } from './event-handle-complete-garbage-full.converter';
import { EventHandleCompleteMixedIntoConverter } from './event-handle-complete-mixed-into.converter';

export interface IConverter<T extends IEventRecord = any> {
  convert(data: T): EventRecordCompleteModel;
}

@Injectable()
export class EventHandleCompleteConverter {
  constructor(private service: EventHandleCompleteService) {}
  convert(data: IEventRecord) {
    let converter: IConverter;
    if (data instanceof GarbageDropEventRecord) {
      converter = new EventHandleCompleteGarbageDropConverter(this.service);
    } else if (data instanceof GarbageFullEventRecord) {
      converter = new EventHandleCompleteGarbageFullConverter(this.service);
    } else if (data instanceof MixedIntoEventRecord) {
      converter = new EventHandleCompleteMixedIntoConverter(this.service);
    } else {
      switch (data.EventType) {
        case EventType.GarbageDrop:
        case EventType.GarbageDropSuperTimeout:
        case EventType.GarbageDropTimeoutHandle:
        case EventType.GarbageDropTimeout:
        case EventType.GarbageDropHandle:
          converter = new EventHandleCompleteGarbageDropConverter(this.service);
          break;
        case EventType.GarbageFull:
          converter = new EventHandleCompleteGarbageFullConverter(this.service);
          break;
        case EventType.MixedInto:
          converter = new EventHandleCompleteMixedIntoConverter(this.service);
          break;
        default:
          throw new Error('Unknown event record type');
      }
    }

    return converter.convert(data);
  }
}
