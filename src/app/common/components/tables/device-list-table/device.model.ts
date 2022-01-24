import { Camera } from 'src/app/network/model/camera.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class DeviceViewModel extends Camera {
  /** */
  GarbageStation?: GarbageStation;
  /** */
  Committees?: Division;
  /** */
  County?: Division;
  /** */
  City?: Division;

  imageSrc: string = '';
}
