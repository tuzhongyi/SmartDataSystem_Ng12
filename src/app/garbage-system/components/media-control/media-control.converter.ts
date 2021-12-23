import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Camera } from 'src/app/network/model/camera.model';
import { VideoUrl } from 'src/app/network/model/url.model';

export class MediaControlConverter implements IConverter<VideoUrl, VideoModel> {
  Convert(input: VideoUrl): VideoModel {
    let model = new VideoModel(input.Url);
    model.username = input.Username;
    model.password = input.Password;
    return model;
  }
}
