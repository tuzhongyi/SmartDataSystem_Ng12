import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import {
  MediaMultipleControlArgs,
  MediaMultipleControlModel,
} from '../media-multiple-control/media-multiple-control.model';

export interface MediaMultipleStatisticWindowStatistic {
  GarbageCount: number;
}

export class MediaMultipleStatisticWindowArgs extends MediaMultipleControlArgs {
  stationId?: string;
  usage: CameraUsage[] = [];
  time?: Date;
  statistic?: MediaMultipleStatisticWindowStatistic;
}

export class MediaMultipleStatisticWindowModel extends MediaMultipleControlModel {
  medias: ImageVideoControlModel[] = [];
  date?: Date;
  station?: GarbageStation;
  statistic?: MediaMultipleStatisticWindowStatistic;
}
