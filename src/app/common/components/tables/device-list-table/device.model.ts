import { Camera } from 'src/app/network/model/camera.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageStationModel } from '../garbage-station-table/garbage-station.model';

export class DeviceViewModel extends Camera {
  /** */
  GarbageStation?: GarbageStationModel;

  imageSrc: string = '';
}
