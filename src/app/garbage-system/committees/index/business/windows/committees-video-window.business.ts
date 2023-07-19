import { Injectable } from '@angular/core';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { VideoWindowViewModel } from 'src/app/common/components/video-window/video-window.model';
import { Duration } from 'src/app/network/model/duration.model';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';

@Injectable()
export class CommitteesVideoWindowBusiness extends VideoWindowViewModel {
  constructor(private sr: SRServerRequestService) {
    super();
  }
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };

  model?: VideoModel;

  async playback(id: string, duration: Duration) {
    let url = await this.sr.playback(id, {
      BeginTime: duration.begin,
      EndTime: duration.end,
    });
    let model = VideoModel.fromUrl(url.Url);
    if (url.WebUrl) {
      model.web = url.WebUrl;
    }
    this.model = model;
    this.show = true;
  }
}
