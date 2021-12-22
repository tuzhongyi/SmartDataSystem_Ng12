import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { Camera } from 'src/app/network/model/camera.model';
import { VideoUrl } from 'src/app/network/model/url.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { VideoControlConverter } from './video-control.converter';

export class VideoControlBussiness implements IBusiness<VideoUrl, VideoModel> {
  constructor(private stationService: GarbageStationRequestService, private srService:SR);
  Converter: IConverter<VideoUrl, VideoModel> = new VideoControlConverter();
  subscription?: ISubscription | undefined;
  load(...args: any): Promise<VideoModel> {
    throw new Error('Method not implemented.');
  }
  getData(camera: Camera): Promise<VideoUrl> {
    this.stationService.
  }
}
