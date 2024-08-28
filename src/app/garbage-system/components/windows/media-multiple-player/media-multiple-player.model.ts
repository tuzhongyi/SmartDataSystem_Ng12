import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';

export class MediaMultiplePlayerArgs {
  stationId?: string;
  usage: CameraUsage[] = [];
  duration?: Duration;
}

export class MediaMultiplePlayerModel {
  medias: ImageVideoControlModel[] = [];
}
