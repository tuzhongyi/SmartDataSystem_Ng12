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
import { CameraDownloadFileParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { SRRequestService } from 'src/app/network/request/sr/sr-request.service';

@Injectable()
export class VideoWindowBusiness
  extends VideoWindowViewModel
  implements IBusiness<VideoUrl, VideoModel>
{
  private camera?: Camera;
  private garbageStation?: GarbageStation;

  model?: VideoModel;
  webUrl?: string;

  style: any = {
    width: '788px',
    height: '376px',
    padding: '0',
    transform: 'translate(-50%, -69%)',
  };

  constructor(
    private srService: SRRequestService,
    private stationService: GarbageStationRequestService
  ) {
    super();
  }

  Converter: IConverter<VideoUrl, VideoModel> = new VideoControlConverter();
  async load(camera: Camera): Promise<VideoModel> {
    this.camera = camera;
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
    this.camera = camera;
    switch (mode) {
      case PlayMode.vod:
        return this.srService.playback(camera.Id, interval!);
      case PlayMode.live:
      default:
        return this.srService.preview(camera.Id);
    }
  }

  ondownload(args: IntervalParams) {
    if (!this.camera || !this.garbageStation) return;
    const interval = args.EndTime.getTime() - args.BeginTime.getTime();

    if (interval > 5 * 60 * 1000) {
      args.EndTime.setTime(args.BeginTime.getTime() + 5 * 1000 * 60);
    }
    let params = new CameraDownloadFileParams();
    params.CameraId = this.camera.Id;
    params.BeginTime = args.BeginTime;
    params.EndTime = args.EndTime;
    params.GarbageStationId = this.garbageStation.Id;
    const response = this.stationService.camera.file.download(params);
    response.then((data) => {
      if (data && data.Url) {
        const a = document.createElement('a');
        a.href = data.Url;
        a.click();
        document.body.appendChild(a);
        document.body.removeChild(a);
      }
    });
  }
}
