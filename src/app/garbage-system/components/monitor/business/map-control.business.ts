import { Injectable } from '@angular/core';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { Camera } from 'src/app/network/model/camera.model';
import { GetPreviewUrlParams } from 'src/app/network/request/sr/sr-request.params';
import { SRRequestService } from 'src/app/network/request/sr/sr-request.service';

@Injectable()
export class MapControlBusiness {
  constructor(private srService: SRRequestService) {}
  videoModel?: VideoModel;
  webUrl?: string;

  async preview(camera: Camera) {
    if (camera) {
      let url = await this.srService.preview(camera.Id);
      this.webUrl = url.WebUrl;
      this.videoModel = VideoModel.fromUrl(url.Url, url.Username, url.Password);
    }
  }
}
