import { GarbageStationModel } from '../../../../view-model/garbage-station.model';
import { ImageControlModel } from '../../../../view-model/image-control.model';

export class GarbageFullStationTableModel {
  GarbageStation?: GarbageStationModel;
  FullDuration?: Date;
  images: ImageControlModel[] = [];
}
