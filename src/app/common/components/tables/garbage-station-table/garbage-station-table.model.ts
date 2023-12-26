import { StationState } from 'src/app/enum/station-state.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { GarbageStationModel } from '../../../../view-model/garbage-station.model';

export class GarbageStationTableModel {
  GarbageStation!: GarbageStationModel;
  states: StationState[] = [];
  urls!: Promise<string[]>;
}
export class GarbageStationTableArgs {
  opts?: SearchOptions;
  stationId?: string;
  divisionId?: string;
  state?: number;
  type?: StationType;
  stationName?: string;
  communityName?: string;
}
