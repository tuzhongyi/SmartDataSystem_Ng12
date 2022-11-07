import { EventEmitter, Injectable } from '@angular/core';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { Camera } from 'src/app/network/model/camera.model';
import { VideoModel } from 'src/app/common/components/video-player/video.model';

@Injectable()
export class VideoSingleWindowBusiness extends WindowViewModel {
  style = {
    width: '32%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };
  media?: ImageControlModel;

  onclosing() {}

  onplay() {}
  onstop() {}
}
