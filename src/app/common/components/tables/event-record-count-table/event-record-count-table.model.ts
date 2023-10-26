import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';

export class EventRecordCountTableModel {
  id: string = '';
  name: string = '';
  parent?: Division;
  value: number = 0;
}

export interface EventRecordCountTableOptions extends DurationParams {
  id?: string;
  type?: UserResourceType;
  unit: TimeUnit;
  eventType: EventType;
}
