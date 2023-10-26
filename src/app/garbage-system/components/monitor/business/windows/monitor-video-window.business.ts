import { EventEmitter, Injectable } from '@angular/core';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { VideoWindowViewModel } from 'src/app/common/components/video-window/video-window.model';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { VideoUrl } from 'src/app/network/model/url.model';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';

@Injectable()
export class MonitorVideoWindowBusiness extends VideoWindowViewModel {
  constructor(private sr: SRServerRequestService) {
    super();
  }
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
  };

  override set show(v: boolean) {
    this._show = v;
    if (!this.show) {
      this.isplayback = undefined;
      this.first = true;
      this.duration = undefined;
    }
  }
  override get show() {
    return this._show;
  }

  model?: VideoModel;
  seek: EventEmitter<number> = new EventEmitter();
  mask: boolean = true;
  first: boolean = true;
  duration?: Duration;
  reserve = 10;

  private isplayback?: boolean;
  get zindex() {
    if (this.mask) {
      return undefined;
    } else {
      return 10000;
    }
  }

  async playback(id: string, duration: Duration) {
    this.isplayback = true;
    this.first = true;
    duration.begin.setSeconds(duration.begin.getSeconds() - this.reserve);
    this.duration = duration;

    let url = await this.sr.playback(id, {
      BeginTime: duration.begin,
      EndTime: duration.end,
    });
    this.play(url);
  }

  async preview(id: string) {
    this.isplayback = false;
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

  onposition(value: number) {
    if (this.isplayback && value === 0 && this.first && this.duration) {
      this.first = false;
      this.seek.emit(10 * 1000);
    }
  }
  onstoping() {
    this.show = false;
  }
}
