import { PlayMode } from 'src/app/common/components/video-player/video.model';
import { ICamera } from '../garbage-station/camera.interface';

export class VideoListArgs<T extends ICamera = any> {
  cameras: T[] = [];
  title: string = '';
  mode: PlayMode = PlayMode.live;
  autoplay: boolean = false;
  time?: Date;
}
