import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { GarbageStationModel } from '../../../../view-model/garbage-station.model';
import { ImageControlModel } from '../../../../view-model/image-control.model';

export class DeviceViewModel extends Camera {
  /** */
  GarbageStation?: GarbageStationModel;

  image!: ImageControlModel;
}
