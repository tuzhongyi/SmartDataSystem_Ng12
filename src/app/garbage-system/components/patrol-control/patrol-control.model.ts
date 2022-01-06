import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { MediaControlViewModel } from '../media-control/media-control.model';

export class PatrolControlModel {
  title: string = '';
  media?: MediaControlViewModel[];
}

export class CameraViewModel extends Camera {
  GarbageStation?: GarbageStation;
}
