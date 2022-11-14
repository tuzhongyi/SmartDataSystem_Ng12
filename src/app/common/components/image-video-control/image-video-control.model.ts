import { DurationParams } from 'src/app/network/request/IParams.interface';
import { ImageControlModel } from '../../../view-model/image-control.model';
import { VideoModel } from '../video-player/video.model';

export class ImageVideoControlModel {
  constructor(cameraId: string, stationId?: string) {
    this.stationId = stationId;
    this.cameraId = cameraId;
  }
  fulled = false;
  cameraId: string;
  stationId?: string;
  image?: ImageControlModel;

  private _video?: VideoModel;
  public get video(): VideoModel | undefined {
    return this._video;
  }
  public set video(v: VideoModel | undefined) {
    this._video = v;
    if (this.videoChanged) {
      this.videoChanged(this._video);
    }
  }
  videoChanged?: (video?: VideoModel) => void;
}

export class ImageVideoControlOperation {
  play = true;
  fullscreen = true;
}

export class PlaybackInterval extends DurationParams {
  CameraId!: string;
}
