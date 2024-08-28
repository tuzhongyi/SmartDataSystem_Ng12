import { Camera } from '../network/model/garbage-station/camera.model';
import { GarbageStationModel } from './garbage-station.model';

export class CameraModel extends Camera {
  GarbageStation!: Promise<GarbageStationModel>;
}
