import { VideoModel } from '../common/components/video-player/video.model';
import { IConverter } from '../common/interfaces/converter.interface';
import { VideoUrl } from '../network/model/url.model';

export class VideoControlConverter implements IConverter<VideoUrl, VideoModel> {
  Convert(source: VideoUrl, ...res: any[]): VideoModel {
    let model = new VideoModel(source.Url);
    model.username = source.Username;
    model.password = source.Password;
    return model;
  }
}
