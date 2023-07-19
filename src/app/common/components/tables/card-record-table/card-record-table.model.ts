import { Duration } from 'src/app/network/model/duration.model';

export class CardRecordTableArgs {
  stationId?: string;
  stationIds?: string[];
  name?: string;
  duration!: Duration;
  asc?: string;
  desc?: string;
  building?: string;
  room?: string;
}
