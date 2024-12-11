import { formatDate } from '@angular/common';
import { Language } from 'src/app/common/tools/language';
import { MixedIntoEventRecord } from 'src/app/network/model/garbage-station/event-record/mixed-into-event-record.model';
import {
  EventHandleCompleteLineModel,
  IEventHandleCompleteLineConverter,
} from '../event-handle-complete-line.model';

export class EventHandleCompleteLineMixedIntoConverter
  implements IEventHandleCompleteLineConverter
{
  convert(data: MixedIntoEventRecord) {
    return [
      this.discover(data),
      this.task(data),
      this.processed(data),
      this.handled(data),
    ];
  }

  private discover(data: MixedIntoEventRecord) {
    let model = new EventHandleCompleteLineModel();
    model.name = formatDate(data.EventTime, Language.YearMonthDay, 'en');
    return model;
  }
  private task(data: MixedIntoEventRecord) {
    let model = new EventHandleCompleteLineModel();
    model.name = formatDate(data.EventTime, Language.MonthDayHHmmss, 'en');
    return model;
  }

  private processed(data: MixedIntoEventRecord) {
    let handle = new EventHandleCompleteLineModel();
    if (data.Data.Processed && data.Data.ProcessTime) {
      handle.name = formatDate(
        data.Data.ProcessTime,
        Language.MonthDayHHmmss,
        'en'
      );
      return handle;
    } else if (data.Data.IsHandle && data.Data.HandleTime) {
      handle.name = formatDate(
        data.Data.HandleTime,
        Language.MonthDayHHmmss,
        'en'
      );
      return handle;
    } else {
      return handle;
    }
  }

  private handled(data: MixedIntoEventRecord) {
    let handle = new EventHandleCompleteLineModel();
    if (data.Data.IsHandle && data.Data.HandleTime) {
      handle.name = formatDate(
        data.Data.HandleTime,
        Language.MonthDayHHmmss,
        'en'
      );
    }
    return handle;
  }
}
