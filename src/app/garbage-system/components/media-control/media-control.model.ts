import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { VideoUrl } from 'src/app/network/model/url.model';

export class MediaControlViewModel {
  constructor(img: string, video?: VideoModel) {
    this.img = img;
    this.video = video;
  }

  img: string;

  video?: VideoModel;
}
