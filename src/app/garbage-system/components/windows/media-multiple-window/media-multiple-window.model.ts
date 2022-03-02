import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class MediaMultipleWindowModel {
  medias: ImageVideoControlModel[] = [];
  date: Date = new Date();
  station!: GarbageStation;
  garbageCount = 0;
}
