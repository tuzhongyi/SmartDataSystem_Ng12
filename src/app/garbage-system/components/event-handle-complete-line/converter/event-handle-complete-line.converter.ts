import { EventType } from 'src/app/enum/event-type.enum';
import { IEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-event-record.model';
import { IEventHandleCompleteLineConverter } from '../event-handle-complete-line.model';
import { EventHandleCompleteLineGarbageDropConverter } from './event-handle-complete-line-garbage-drop.converter';
import { EventHandleCompleteLineGarbageFullConverter } from './event-handle-complete-line-garbage-full.converter';
import { EventHandleCompleteLineMixedIntoConverter } from './event-handle-complete-line-mixed-into.converter';

export class EventHandleCompleteLineConverter {
  convert<T>(data: IEventRecord<T>) {
    let converter: IEventHandleCompleteLineConverter;
    switch (data.EventType) {
      case EventType.MixedInto:
        converter = new EventHandleCompleteLineMixedIntoConverter();
        break;
      case EventType.GarbageFull:
        converter = new EventHandleCompleteLineGarbageFullConverter();
        break;
      case EventType.GarbageDrop:
      case EventType.GarbageDropSuperTimeout:
      case EventType.GarbageDropTimeoutHandle:
      case EventType.GarbageDropTimeout:
      case EventType.GarbageDropHandle:
        converter = new EventHandleCompleteLineGarbageDropConverter();
        break;
      default:
        throw new Error(
          'EventHandleCompleteLineConverter Not support event type'
        );
    }
    return converter.convert(data);
  }
}
