import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

export interface MediaMultipleWindowStatistic {
  GarbageCount: number;
}

export class MediaMultipleWindowArgs {
  stationId?: string;
  usage: CameraUsage[] = [];
  time: Date = new Date();
  statistic?: MediaMultipleWindowStatistic;
}

export class MediaMultipleWindowModel {
  medias: ImageVideoControlModel[] = [];
  date: Date = new Date();
  station?: GarbageStation;
  statistic?: MediaMultipleWindowStatistic;
}
