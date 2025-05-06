import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { IModel } from 'src/app/network/model/model.interface';

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

export interface IMediaMultipleControlBusiness
  extends IBusiness<IModel, MediaMultipleControlModel> {
  manualCapture(
    id: string,
    medias: ImageVideoControlModel[]
  ): Promise<ImageVideoControlModel[]>;
}
