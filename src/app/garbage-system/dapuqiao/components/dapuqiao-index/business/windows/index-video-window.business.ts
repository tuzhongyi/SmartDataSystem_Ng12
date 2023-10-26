import { Injectable } from '@angular/core';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { VideoWindowViewModel } from 'src/app/common/components/video-window/video-window.model';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { VideoUrl } from 'src/app/network/model/url.model';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';

@Injectable()
export class IndexVideoWindowBusiness extends VideoWindowViewModel {
  constructor(private sr: SRServerRequestService) {
    super();
  }
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
  };

  model?: VideoModel;
  mask: boolean = true;
  get zindex() {
    if (this.mask) {
      return undefined;
    } else {
      return 10000;
    }
  }

  async playback(id: string, duration: Duration) {
    let url = await this.sr.playback(id, {
      BeginTime: duration.begin,
      EndTime: duration.end,
    });
    this.play(url);
  }

  async preview(id: string) {
    let url = await this.sr.preview(id);
    this.play(url);
  }

  private play(url: VideoUrl) {
    let model = VideoModel.fromUrl(url.Url);
    if (url.WebUrl) {
      model.web = url.WebUrl;
    }
    if (url.Username) {
      model.username = url.Username;
    }
    if (url.Password) {
      model.password = url.Password;
    }

    this.model = model;
    this.show = true;
  }
}
