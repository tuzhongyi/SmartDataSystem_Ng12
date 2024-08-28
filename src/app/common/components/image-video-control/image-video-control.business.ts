import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { VideoControlConverter } from 'src/app/converter/video-control.converter';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { VideoUrl } from 'src/app/network/model/url.model';
import { GetVodUrlParams } from 'src/app/network/request/ai-sr-server/sr-server.params';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import { IBusiness } from '../../interfaces/bussiness.interface';
import { IConverter } from '../../interfaces/converter.interface';
import { ISubscription } from '../../interfaces/subscribe.interface';
import { PlayMode, VideoModel } from '../video-player/video.model';

@Injectable()
export class ImageVideoControlBusiness
  implements IBusiness<VideoUrl, VideoModel>
{
  constructor(
    private srService: SRServerRequestService,
    private local: LocalStorageService
  ) {}
  Converter: IConverter<VideoUrl, VideoModel> = new VideoControlConverter();
  subscription?: ISubscription | undefined;
  async load(
    cameraId: string,
    mode: PlayMode,
    duration?: Duration
  ): Promise<VideoModel> {
    let stream = this.local.video.stream;
    let url = await this.getData(cameraId, mode, stream, duration);
    return this.Converter.Convert(url);
  }

  async getData(
    cameraId: string,
    mode: PlayMode,
    stream: StreamType,
    interval?: Duration
  ): Promise<VideoUrl> {
    switch (mode) {
      case PlayMode.vod:
        return this.getVodUrl(cameraId, stream, interval!);
      case PlayMode.live:
      default:
        return this.getLiveUrl(cameraId, stream);
    }
  }

  getLiveUrl(cameraId: string, stream: StreamType) {
    return this.srService.preview(cameraId, stream);
  }
  getVodUrl(cameraId: string, stream: StreamType, interval: Duration) {
    let params = new GetVodUrlParams();
    params.BeginTime = interval.begin;
    params.EndTime = interval.end;
    params.CameraId = cameraId;
    params.StreamType = stream;
    return this.srService.playback(params);
  }
}
