import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ImageControlModel } from '../../image-control/image-control.model';
import { GarbageStationModel } from '../garbage-station-table/garbage-station.model';

export class GarbageFullStationTableModel {
  GarbageStation?: GarbageStationModel;
  FullDuration?: Date;
  images: ImageControlModel[] = [];
}
