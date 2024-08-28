import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

export class MediaMultipleControlArgs {
  stationId?: string;
  usage: CameraUsage[] = [];
  time?: Date;
}

export class MediaMultipleControlModel {
  medias: ImageVideoControlModel[] = [];
  date?: Date;
  station?: GarbageStation;
}
