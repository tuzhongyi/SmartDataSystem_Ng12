import { Injectable } from '@angular/core';
import { DownloadBusiness } from 'src/app/common/business/download.business';
import {
  PlayMode,
  VideoModel,
} from 'src/app/common/components/video-player/video.model';
import { VideoWindowViewModel } from 'src/app/common/components/video-window/video-window.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { VideoControlConverter } from 'src/app/converter/video-control.converter';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { VideoUrl } from 'src/app/network/model/url.model';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class IndexVideoControlWindowBusiness
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
    private srService: SRServerRequestService,
    private stationService: GarbageStationRequestService,
    private download: DownloadBusiness,
    private local: LocalStorageService
  ) {
    super();
  }

  Converter: IConverter<VideoUrl, VideoModel> = new VideoControlConverter();
  async load(camera: Camera): Promise<VideoModel> {
    this.camera = camera;
    this.garbageStation = await this.getGarbageStation(camera.GarbageStationId);
    this.title = this.garbageStation.Name;
    let url = await this.srService.preview(camera.Id, this.local.video.stream);
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
    interval?: Duration
  ): Promise<VideoUrl> {
    this.camera = camera;
    switch (mode) {
      case PlayMode.vod:
        return this.srService.playback(camera.Id, interval!);
      case PlayMode.live:
      default:
        return this.srService.preview(camera.Id, this.local.video.stream);
    }
  }

  ondownload(args: Duration) {
    if (!this.camera || !this.garbageStation) return;

    this.download.video(this.garbageStation.Id, this.camera.Id, args);
  }
}
