import { StreamType } from 'src/app/enum/stream-type.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { ImageControlModel } from '../../../view-model/image-control.model';

export class ImageVideoControlModel<T = any> {
  constructor(cameraId: string, source?: T) {
    this.cameraId = cameraId;
    this.source = source;
  }

  private _fulled: boolean = false;
  public get fulled(): boolean {
    return this._fulled;
  }
  public set fulled(v: boolean) {
    this._fulled = v;
  }

  image?: ImageControlModel;
  source?: T;
  cameraId: string;
  duration?: Duration;
}

export class ImageVideoControlOperation {
  play = true;
  fullscreen = true;
}

export class PlaybackInterval implements Duration {
  begin!: Date;
  end!: Date;
  CameraId!: string;
}

export class UserVideoConfig {
  stream: StreamType = StreamType.main;
}
