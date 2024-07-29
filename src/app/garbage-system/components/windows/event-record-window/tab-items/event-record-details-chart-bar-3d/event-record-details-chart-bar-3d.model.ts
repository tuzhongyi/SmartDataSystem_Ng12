import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';

export class EventRecordDetailsChartBarD3Args {
  duration!: Duration;
  divisonId?: string;
  stationId?: string;
  unit = TimeUnit.Month;
  type = EventType.None;
}
