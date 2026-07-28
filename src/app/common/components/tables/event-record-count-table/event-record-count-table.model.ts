import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';

export class EventRecordCountTableModel {
  id: string = '';
  name: string = '';

  parent?: Division;
  value: number = 0;
  community?: string = '';
}

export class EventRecordCountTableOptions {
  date = new Date();
  id?: string;
  type?: DivisionType;
  unit: TimeUnit = TimeUnit.Day;
  eventType: EventType = EventType.None;
}
