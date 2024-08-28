import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';

export class AuditListStationGarbageManagerTabCameraItem extends Camera {
  Usages: CameraUsage[] = [];
}
