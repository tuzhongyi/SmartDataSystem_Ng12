import { EventType } from "src/app/enum/event-type.enum";
import { TimeUnit } from "src/app/enum/time-unit.enum";
import { UserResourceType } from "src/app/enum/user-resource-type.enum";

export interface DetailsChartLoadOptions {
  stationId?: string;
  divisionId?: string;
  begin: Date;
  end: Date;
  unit: TimeUnit;
  type: EventType;
}