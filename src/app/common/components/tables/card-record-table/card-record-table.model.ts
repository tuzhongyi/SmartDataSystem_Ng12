import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { PageArgs } from '../table.interface';

export class CardRecordTableArgs extends PageArgs {
  stationId?: string;
  stationIds?: string[];
  name?: string;
  duration!: Duration;
  asc?: string;
  desc?: string;
  building?: string;
  room?: string;
}
