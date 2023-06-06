import { Injectable } from '@angular/core';
import {
  PlayMode,
  VideoModel,
} from 'src/app/common/components/video-player/video.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { VideoControlConverter } from 'src/app/converter/video-control.converter';
import { Duration } from 'src/app/network/model/duration.model';
import { IdNameModel } from 'src/app/network/model/model.interface';
import { VideoUrl } from 'src/app/network/model/url.model';

import { VehicleSRServerRequestService } from 'src/app/network/request/garbage_vehicles/vehicle-sr-server/sr-server.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';

@Injectable()
export class IndexVideoPlayerWindow
  extends WindowViewModel
  implements IBusiness<VideoUrl, VideoModel>
{
  constructor(private sr: VehicleSRServerRequestService) {
    super();
  }

  cameras: IdNameModel[] = [];
  mode: PlayMode = PlayMode.live;

  title: string = '';

  autoplay: boolean = false;
  time?: Date;
  style = {
    width: '60%',
    height: '60%',
    zIndex: 9999,
  };

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
