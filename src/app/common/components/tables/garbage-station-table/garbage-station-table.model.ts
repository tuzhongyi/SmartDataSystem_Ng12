import { GarbageStationModel } from '../../../../view-model/garbage-station.model';

export class GarbageStationTableModel {
  GarbageStation!: GarbageStationModel;
  urls!: Promise<string[]>;
}
