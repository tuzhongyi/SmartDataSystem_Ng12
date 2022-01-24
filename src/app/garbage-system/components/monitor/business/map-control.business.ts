import { Injectable } from '@angular/core';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { Camera } from 'src/app/network/model/camera.model';
import { GetPreviewUrlParams } from 'src/app/network/request/sr/sr-request.params';
import { SRRequestService } from 'src/app/network/request/sr/sr-request.service';
import { PatrolControlBusiness } from './patrol-control.business';
import { VideoControlWindowBusiness } from './windows/video-control-window.business';

@Injectable()
export class MapControlBusiness {
  constructor(
    private patrol: PatrolControlBusiness,
    private video: VideoControlWindowBusiness
  ) {}

  async onpatrol() {
    this.patrol.show = true;
  }

  onvideoplay(camera: Camera) {
    this.video.show = true;
    this.video.load(camera);
  }
}
