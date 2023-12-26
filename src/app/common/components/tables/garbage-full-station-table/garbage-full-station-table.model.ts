import { StationState } from 'src/app/enum/station-state.enum';
import { GarbageStationModel } from '../../../../view-model/garbage-station.model';

export class GarbageFullStationTableModel {
  GarbageStation!: Promise<GarbageStationModel>;
  FullDuration?: Date;
  urls!: Promise<string[]>;
  states: StationState[] = [];
}
