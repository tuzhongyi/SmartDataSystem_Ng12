import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ImageControlModel } from '../../../../view-model/image-control.model';
import { GarbageStationModel } from '../../../../view-model/garbage-station.model';

export class GarbageFullStationTableModel {
  GarbageStation?: GarbageStationModel;
  FullDuration?: Date;
  images: ImageControlModel[] = [];
}
