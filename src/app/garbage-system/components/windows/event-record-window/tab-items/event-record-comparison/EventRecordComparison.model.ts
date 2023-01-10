import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/division-number-statistic-v2.model';
import {
  GarbageFullEventRecord,
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from 'src/app/network/model/garbage-event-record.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';

export interface EventRecordComparisonOptions {
  divisionType: DivisionType;
  eventType: EventType;
  ids: string[];
  unit: TimeUnit;
  date: Date;
}

export type EventRecordType =
  | IllegalDropEventRecord
  | MixedIntoEventRecord
  | GarbageFullEventRecord;

export type NumberStatisticV2 =
  | GarbageStationNumberStatisticV2
  | DivisionNumberStatisticV2;
