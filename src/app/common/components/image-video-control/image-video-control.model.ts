import { DurationParams } from 'src/app/network/request/IParams.interface';
import { ImageControlModel } from '../../../view-model/image-control.model';

export class ImageVideoControlModel<T = any> {
  constructor(cameraId: string, source?: T) {
    this.cameraId = cameraId;
    this.source = source;
  }
  fulled = false;
  image?: ImageControlModel;
  source?: T;
  cameraId: string;
}

export class ImageVideoControlOperation {
  play = true;
  fullscreen = true;
}

export class PlaybackInterval extends DurationParams {
  CameraId!: string;
}
