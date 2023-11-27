import { SearchOptions } from 'src/app/view-model/search-options.model';
import { GarbageStationModel } from '../../../../view-model/garbage-station.model';

export class GarbageStationTableModel {
  GarbageStation!: GarbageStationModel;
  urls!: Promise<string[]>;
}
export class GarbageStationTableArgs {
  opts?: SearchOptions;
  stationId?: string;
  divisionId?: string;
  state?: number;
}
