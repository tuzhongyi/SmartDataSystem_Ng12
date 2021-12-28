import { Injectable } from '@angular/core';
import {
  PlayMode,
  VideoModel,
} from 'src/app/common/components/video-player/video.model';

@Injectable({
  providedIn: 'root',
})
export class VideoPlayerBusiness {
  videoPlayArgs?: VideoModel;
  url = '';
  webUrl = '';
  playMode = PlayMode.live;
  playVideoVideoId = '';
  playCameraName = '';

  constructor() {
    this.playCameraName = '视频';
  }
}
