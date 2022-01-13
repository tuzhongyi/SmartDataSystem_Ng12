import { Injectable } from '@angular/core';
import {
  PlayMode,
  VideoModel,
} from 'src/app/common/components/video-player/video.model';
import { VideoWindowViewModel } from 'src/app/common/components/video-window/video-window.model';
import { WindowViewModel } from 'src/app/common/components/window/window.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { VideoControlConverter } from 'src/app/converter/video-control.converter';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { VideoUrl } from 'src/app/network/model/url.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { SRRequestService } from 'src/app/network/request/sr/sr-request.service';

@Injectable()
export class VideoWindowBusiness
  extends VideoWindowViewModel
  implements IBusiness<VideoUrl, VideoModel>
{
  model?: VideoModel;
  webUrl?: string;

  style: any = {
    width: '788px',
    height: '376px',
    padding: '0',
    transform: 'translate(-50%, -62%)',
  };

  constructor(
    private srService: SRRequestService,
    private stationService: GarbageStationRequestService
  ) {
    super();
    this.show = true;
  }

  garbageStation?: GarbageStation;

  Converter: IConverter<VideoUrl, VideoModel> = new VideoControlConverter();
  async load(camera: Camera): Promise<VideoModel> {
    this.garbageStation = await this.getGarbageStation(camera.GarbageStationId);
    this.title = this.garbageStation.Name;
    let url = await this.srService.preview(camera.Id);
    this.webUrl = url.WebUrl;

    let model = VideoModel.fromUrl(url.Url, url.Username, url.Password);
    this.model = model;
    return model;
  }

  getGarbageStation(stationId: string) {
    return this.stationService.cache.get(stationId);
  }

  getData(
    camera: Camera,
    mode: PlayMode,
    interval?: IntervalParams
  ): Promise<VideoUrl> {
    switch (mode) {
      case PlayMode.vod:
        return this.srService.playback(camera.Id, interval!);
      case PlayMode.live:
      default:
        return this.srService.preview(camera.Id);
    }
  }

  async preview(camera: Camera) {
    if (camera) {
      let url = await this.srService.preview(camera.Id);
      this.webUrl = url.WebUrl;
      this.model = VideoModel.fromUrl(url.Url, url.Username, url.Password);
    }
  }
}
