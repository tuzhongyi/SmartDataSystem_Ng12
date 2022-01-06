import { ImageControlModel } from 'src/app/common/components/image-control/image-control.model';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Camera } from 'src/app/network/model/camera.model';
import { VideoUrl } from 'src/app/network/model/url.model';
import { MediumRequestService } from 'src/app/network/request/medium/medium-request.service';
import { MediaControlViewModel } from '../garbage-system/components/media-control/media-control.model';
import { ImageControlConverter } from './image-control.converter';
import { VideoControlConverter } from './video-control.converter';

export interface MediaControlSource {
  camera: Camera;
  url: VideoUrl;
}

export class MediaControlConverter
  implements IConverter<MediaControlSource, MediaControlViewModel>
{
  private converter = {
    image: new ImageControlConverter(),
    video: new VideoControlConverter(),
  };

  Convert(source: MediaControlSource): MediaControlViewModel;
  Convert(camera: Camera, url?: VideoUrl): MediaControlViewModel;
  Convert(
    camera: Camera,
    url?: (camera: Camera) => VideoUrl
  ): MediaControlViewModel;

  Convert(
    source: MediaControlSource | Camera,
    url?: VideoUrl | ((camera: Camera) => VideoUrl)
  ): MediaControlViewModel {
    let img: ImageControlModel;
    let video: VideoModel | undefined;
    let model: MediaControlViewModel;
    if (source instanceof Camera) {
      img = this.converter.image.Convert(source);
      if (url) {
        if (url instanceof VideoUrl) {
          video = this.converter.video.Convert(url);
        } else {
          video = this.converter.video.Convert(url!(source));
        }
      }
    } else {
      img = this.converter.image.Convert(source.camera);
      video = this.converter.video.Convert(source.url);
    }
    model = new MediaControlViewModel(img, video);
    return model;
  }
}
