import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';

export interface DropDetailsChartLoadOptions {
  stationId?: string;
  divisionId?: string;
  begin: Date;
  end: Date;
  unit: TimeUnit;
  type: EventType[];
}
