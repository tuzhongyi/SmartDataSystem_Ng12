import { GarbageStationModel } from '../../../../view-model/garbage-station.model';
import { ImageControlModel } from '../../../../view-model/image-control.model';

export class GarbageFullStationTableModel {
  GarbageStation!: Promise<GarbageStationModel>;
  FullDuration?: Date;
  images!: Promise<ImageControlModel[]>;
}
