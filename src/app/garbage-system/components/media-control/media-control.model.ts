import { ImageControlModel } from 'src/app/common/components/image-control/image-control.model';
import { VideoModel } from 'src/app/common/components/video-player/video.model';

export class MediaControlViewModel {
  constructor(img?: ImageControlModel, video?: VideoModel) {
    this.image = img;
    this.video = video;
  }

  image?: ImageControlModel;

  video?: VideoModel;
}
