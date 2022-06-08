import { EventType } from 'src/app/enum/event-type.enum';

export class CommitteesHistoryTableViewModel<T = any> {
  Id: string = '';
  Index: number = 0;
  StationName: string = '';
  Time: string = '';
  Data?: T;
}

export class CommitteesHistoryTableTypes {
  IllegalDrop = EventType.IllegalDrop;
  MixedInto = EventType.MixedInto;
}
