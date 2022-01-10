import { ChangeControlModel } from 'src/app/view-model/change-control.model';
import { ImageControlModel } from '../image-control/image-control.model';
import { VideoModel } from '../video-player/video.model';

export class ImageVideoControlModel {
  constructor(cameraId: string) {
    this.cameraId = cameraId;
  }
  fulled = false;
  cameraId: string;
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
