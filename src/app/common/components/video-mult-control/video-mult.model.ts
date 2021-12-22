import { Camera } from 'src/app/network/model/camera.model';
import { VideoModel } from '../video-player/video.model';

export class VideoControlModel {
  camera!: Camera;
  video!: VideoModel;
}

export class VideoMultControlModel {
  list: VideoControlModel[] = [];
}
