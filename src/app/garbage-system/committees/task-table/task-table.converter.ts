import { TaskTableViewModel } from './task-table.model';

import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-drop-event-record.model';

@Injectable()
export class TaskTableConverter
  implements
    IConverter<
      GarbageDropEventRecord[],
      TaskTableViewModel<GarbageDropEventRecord>[]
    >
{
  constructor(private global: GlobalStorageService) {}
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

  private itemConvert(index: number, source: GarbageDropEventRecord) {
    let vm = new TaskTableViewModel<GarbageDropEventRecord>();
    vm.StationName = source.Data.StationName;
    vm.Processor = source.Data.ProcessorName ?? '';
    vm.Id = source.EventId;
    vm.Index = index;

    let current =
      source.Data.IsHandle && source.Data.HandleTime
        ? new Date(source.Data.HandleTime)
        : new Date();
    let drop = new Date(source.Data.DropTime);
    let interval_time = current.getTime() - drop.getTime();
    let interval = new Date(interval_time);
    interval.setHours(interval.getHours() + interval.getTimezoneOffset() / 60);
    vm.Interval = Language.Time(interval);
    vm.Time = formatDate(source.Data.DropTime, 'HH:mm', 'en');
    vm.State = source.EventType;
    vm.StateLanguage = Language.GarbageDropEventType(
      source.EventType,
      this.global.defaultDivisionType === DivisionType.City
        ? source.Data.IsSuperTimeout
        : source.Data.IsTimeout
    );
    vm.data = source;
    return vm;
  }
}
