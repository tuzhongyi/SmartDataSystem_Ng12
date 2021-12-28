import { Injectable } from '@angular/core';
import {
  PlayMode,
  VideoModel,
} from 'src/app/common/components/video-player/video.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { Camera } from 'src/app/network/model/camera.model';
import { VideoUrl } from 'src/app/network/model/url.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import {
  GetPreviewUrlParams,
  GetVodUrlParams,
} from 'src/app/network/request/sr/sr-request.params';
import { SRRequestService } from 'src/app/network/request/sr/sr-request.service';
import { MediaControlConverter } from './media-control.converter';

@Injectable()
export class MediaVideoControlBussiness
  implements IBusiness<VideoUrl, VideoModel>
{
  constructor(private srService: SRRequestService) {}
  Converter: IConverter<VideoUrl, VideoModel> = new MediaControlConverter();
  subscription?: ISubscription | undefined;
  async load(
    camera: Camera,
    mode: PlayMode,
    streamType: StreamType
  ): Promise<VideoModel> {
    let data = await this.getData(camera, mode, streamType);
    let result = this.Converter.Convert(data);
    return result;
  }

  async getData(
    camera: Camera,
    mode: PlayMode,
    streamType: StreamType = StreamType.sub
  ): Promise<VideoUrl> {
    switch (mode) {
      case PlayMode.live:
        let params1 = new GetPreviewUrlParams();
        params1.CameraId = camera.Id;
        params1.StreamType = streamType;
        return this.srService.preview(params1);
      case PlayMode.vod:
        let params2 = new GetVodUrlParams();
        params2.CameraId = camera.Id;
        params2.StreamType = streamType;

        return this.srService.playback(params2);
      default:
        throw new Error('video mode error');
    }
  }
}
