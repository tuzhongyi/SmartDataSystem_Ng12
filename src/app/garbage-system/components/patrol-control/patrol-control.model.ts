import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class PatrolControlModel {
  title: string = '';
  media?: ImageVideoControlModel[];
  status: OnlineStatus = OnlineStatus.Offline;
}

export class CameraViewModel extends Camera {
  GarbageStation?: GarbageStation;
}
