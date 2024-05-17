import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';

export class EventRecordCountTableModel {
  id: string = '';
  name: string = '';
  parent?: Division;
  value: number = 0;
}

export class EventRecordCountTableOptions {
  date = new Date();
  id?: string;
  type?: UserResourceType;
  unit: TimeUnit = TimeUnit.Day;
  eventType: EventType = EventType.None;
}
