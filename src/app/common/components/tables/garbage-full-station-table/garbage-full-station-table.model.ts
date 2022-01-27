import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ImageControlModel } from '../../image-control/image-control.model';

export class GarbageFullStationTableModel {
  GarbageStation?: GarbageStation;
  Committees?: Division;
  County?: Division;
  City?: Division;
  FullDuration?: Date;
  images: ImageControlModel[] = [];
}
