import { EventType } from 'src/app/enum/event-type.enum';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';

export class CommitteesHistoryTableViewModel<
  T = any
> extends EventRecordViewModel {
  Id: string = '';
  Index: number = 0;
  Data?: T;
}

export class CommitteesHistoryTableTypes {
  IllegalDrop = EventType.IllegalDrop;
  MixedInto = EventType.MixedInto;
}
