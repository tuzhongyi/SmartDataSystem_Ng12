import { Injectable } from '@angular/core';
import { DownloadBusiness } from 'src/app/common/business/download.business';
import {
  PlayMode,
  VideoModel,
} from 'src/app/common/components/video-player/video.model';
import { VideoWindowViewModel } from 'src/app/common/components/video-window/video-window.model';

import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { VideoControlConverter } from 'src/app/converter/video-control.converter';
import { VideoUrl } from 'src/app/network/model/url.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import { ICamera } from 'src/app/network/model/camera.interface';

@Injectable()
export class VideoControlWindowBusiness
  extends VideoWindowViewModel
  implements IBusiness<VideoUrl, VideoModel>
{
  private camera?: ICamera;

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
    private download: DownloadBusiness
  ) {
    super();
  }

  Converter: IConverter<VideoUrl, VideoModel> = new VideoControlConverter();
  async load(camera: ICamera): Promise<VideoModel> {
    this.camera = camera;
    this.title = camera.Name;
    let url = await this.srService.preview(camera.Id);
    this.webUrl = url.WebUrl;

    let model = VideoModel.fromUrl(url.Url, url.Username, url.Password);
    this.model = model;
    return model;
  }

  getData(
    camera: ICamera,
    mode: PlayMode,
    interval?: DurationParams
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
}
