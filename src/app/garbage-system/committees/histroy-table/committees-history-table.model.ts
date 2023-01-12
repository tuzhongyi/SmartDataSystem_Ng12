import { EventType } from 'src/app/enum/event-type.enum';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';

export class CommitteesHistoryTableViewModel<
  T = any
> extends EventRecordViewModel<T> {
  Id: string = '';
  Index: number = 0;
}

export class CommitteesHistoryTableTypes {
  IllegalDrop = EventType.IllegalDrop;
  MixedInto = EventType.MixedInto;
}
