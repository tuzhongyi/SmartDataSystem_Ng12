import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';
import { PageArgs } from '../table.interface';

export class AuditGarbageStationTableArgs extends PageArgs {
  name?: string;
  divisionId?: string;
  state?: number;
  drop?: boolean;
}

export class AuditGarbageStationTableModel extends GarbageStationModel {
  urls!: Promise<string[]>;
  drop?: GarbageStationNumberStatistic;
}
