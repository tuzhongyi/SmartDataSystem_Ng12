import { Injectable } from '@angular/core';
import { VideoControlConverter } from 'src/app/converter/video-control.converter';
import { Duration } from 'src/app/network/model/duration.model';
import { VideoUrl } from 'src/app/network/model/url.model';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { IBusiness } from '../../interfaces/bussiness.interface';
import { IConverter } from '../../interfaces/converter.interface';

import { VideoModel, PlayMode } from '../video-player/video.model';

@Injectable()
export class VideoPlayerWindowBusiness
  implements IBusiness<VideoUrl, VideoModel>
{
  constructor(private sr: SRServerRequestService) {}

  Converter: IConverter<VideoUrl, VideoModel> = new VideoControlConverter();
  async load(
    cameraId: string,
    mode: PlayMode,
    duration?: Duration
  ): Promise<VideoModel> {
    let data = await this.getData(cameraId, mode, duration);

    let model = this.Converter.Convert(data);
    return model;
  }
  getData(
    cameraId: string,
    mode: PlayMode,
    duration?: Duration
  ): Promise<VideoUrl> {
    if (mode == PlayMode.live) {
      return this.sr.preview(cameraId);
    } else {
      let params = new DurationParams();
      params.BeginTime = duration!.begin;
      params.EndTime = duration!.end;
      return this.sr.playback(cameraId, params);
    }
  }
}
