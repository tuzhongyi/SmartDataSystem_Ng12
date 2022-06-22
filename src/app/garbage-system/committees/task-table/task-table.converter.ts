import { TaskTableViewModel } from './task-table.model';

import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { Language } from 'src/app/common/tools/language';
import { formatDate } from '@angular/common';

export class TaskTableConverter
  implements
    IConverter<
      GarbageDropEventRecord[],
      TaskTableViewModel<GarbageDropEventRecord>[]
    >
{
  Convert(records: GarbageDropEventRecord[]) {
    let datas = new Array<TaskTableViewModel<GarbageDropEventRecord>>();

    let i = 0;
    datas = records
      .sort((a, b) => {
        return (
          new Date(b.Data.DropTime).getTime() -
          new Date(a.Data.DropTime).getTime()
        );
      })
      .map((x) => {
        return this.itemConvert(++i, x);
      });
    return datas;
  }

  private itemConvert(index: number, record: GarbageDropEventRecord) {
    let vm = new TaskTableViewModel<GarbageDropEventRecord>();
    vm.StationName = record.Data.StationName;
    vm.Processor = record.Data.ProcessorName ?? '';
    vm.Id = record.EventId;
    vm.Index = index;

    let current =
      record.Data.IsHandle && record.Data.HandleTime
        ? new Date(record.Data.HandleTime)
        : new Date();
    let drop = new Date(record.Data.DropTime);
    let interval_time = current.getTime() - drop.getTime();
    let interval = new Date(interval_time);
    interval.setHours(interval.getHours() + interval.getTimezoneOffset() / 60);
    vm.Interval = Language.Time(interval);
    vm.Time = formatDate(record.Data.DropTime, 'HH:mm', 'en');
    vm.State = record.EventType;
    vm.StateLanguage = Language.GarbageDropEventType(
      record.EventType,
      record.Data.IsTimeout
    );
    vm.data = record;
    return vm;
  }
}
