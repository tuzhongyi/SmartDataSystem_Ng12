import { GarbageStationModel } from '../../../../view-model/garbage-station.model';

export class GarbageFullStationTableModel {
  GarbageStation!: Promise<GarbageStationModel>;
  FullDuration?: Date;
  urls!: Promise<string[]>;
}
