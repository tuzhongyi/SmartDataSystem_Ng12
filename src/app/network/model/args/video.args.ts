import { PlayMode } from 'src/app/common/components/video-player/video.model';

export class VideoArgs<T = any> {
  cameraId: string = '';
  title: string = '';
  mode: PlayMode = PlayMode.live;
  autoplay: boolean = false;
  time?: Date;
  data?: T;
}
