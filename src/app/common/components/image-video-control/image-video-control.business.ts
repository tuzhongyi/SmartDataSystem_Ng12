import { Injectable } from '@angular/core';
import { VideoControlConverter } from 'src/app/converter/video-control.converter';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { UserConfigType } from 'src/app/enum/user-config-type.enum';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { VideoUrl } from 'src/app/network/model/url.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { GetVodUrlParams } from 'src/app/network/request/sr/sr-request.params';
import { SRRequestService } from 'src/app/network/request/sr/sr-request.service';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';
import { IBusiness } from '../../interfaces/bussiness.interface';
import { IConverter } from '../../interfaces/converter.interface';
import { ISubscription } from '../../interfaces/subscribe.interface';
import { PlayMode, VideoModel } from '../video-player/video.model';

@Injectable()
export class ImageVideoControlBusiness
  implements IBusiness<VideoUrl, VideoModel>
{
  constructor(
    private srService: SRRequestService,
    private local: LocalStorageService,
    private userService: UserRequestService
  ) {}
  Converter: IConverter<VideoUrl, VideoModel> = new VideoControlConverter();
  subscription?: ISubscription | undefined;
  async load(
    cameraId: string,
    mode: PlayMode,
    interval?: DurationParams
  ): Promise<VideoModel> {
    let stream = await this.loadSteam();
    if (!stream) {
      stream = mode == PlayMode.live ? StreamType.sub : StreamType.main;
    }
    let url = await this.getData(cameraId, mode, stream, interval);
    return this.Converter.Convert(url);
  }

  async loadSteam() {
    try {
      let result = await this.userService.config.get(
        this.local.user.Id,
        UserConfigType.VideoStream
      );
      if (result) {
        return JSON.parse(result);
      }
    } catch (ex) {
      console.warn('loadSteam error', ex);
    }
  }

  async getData(
    cameraId: string,
    mode: PlayMode,
    stream: StreamType,
    interval?: DurationParams
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
  getVodUrl(cameraId: string, stream: StreamType, interval: DurationParams) {
    let params = new GetVodUrlParams();
    params.BeginTime = interval.BeginTime;
    params.EndTime = interval.EndTime;
    params.CameraId = cameraId;
    params.StreamType = stream;
    return this.srService.playback(params);
  }
}
