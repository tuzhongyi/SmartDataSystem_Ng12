import { DatePipe, formatDate } from '@angular/common';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import {
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from 'src/app/network/model/event-record.model';
import { CommitteesHistoryTableViewModel } from './committees-history-table.model';

export class CommitteesHistoryTableConverter
  implements
    IConverter<
      Array<IllegalDropEventRecord | MixedIntoEventRecord>,
      CommitteesHistoryTableViewModel<
        IllegalDropEventRecord | MixedIntoEventRecord
      >[]
    >
{
  Convert(
    input: Array<IllegalDropEventRecord | MixedIntoEventRecord>,
    datePipe: DatePipe
  ): CommitteesHistoryTableViewModel<
    IllegalDropEventRecord | MixedIntoEventRecord
  >[] {
    return input.map((x) => {
      return this.ConvertItem(x);
    });
  }

  ConvertItem(
    input: IllegalDropEventRecord | MixedIntoEventRecord
  ): CommitteesHistoryTableViewModel<
    IllegalDropEventRecord | MixedIntoEventRecord
  > {
    let vm = new CommitteesHistoryTableViewModel<
      IllegalDropEventRecord | MixedIntoEventRecord
    >();
    vm.Data = input;
    vm.Id = input.EventId;

    vm.StationName = input.Data.StationName;
    vm.Time = formatDate(input.EventTime, 'HH:mm', 'en');
    return vm;
  }
}
