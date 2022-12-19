import { EventEmitter, Injectable } from '@angular/core';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { Camera } from 'src/app/network/model/camera.model';
import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { ICamera } from 'src/app/network/model/camera.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { VehicleSRServerRequestService } from 'src/app/network/request/garbage_vehicles/vehicle-sr-server/sr-server.service';
import { PlayMode } from 'src/app/common/components/video-player/video.model';
import { VideoUrl } from 'src/app/network/model/url.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { StreamType } from 'src/app/enum/stream-type.enum';
import {
  GetPreviewUrlParams,
  GetVodUrlParams,
} from 'src/app/network/request/ai-sr-server/sr-server.params';
import { MediaVideoControlArrayConverter } from 'src/app/garbage-system/components/media-control/media-control.converter';
import { IMediaControlBusiness } from 'src/app/garbage-system/components/media-control/media-control.model';

@Injectable()
export class MediaSingleWindowBusiness
  extends WindowViewModel
  implements IMediaControlBusiness
{
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };
  camera: Array<Camera | ImageControlModel> = [];
  index: number = -1;
  autoplay = false;

  closing: EventEmitter<void> = new EventEmitter();
  playing = false;

  onclosing() {
    try {
      if (this.playing) return;
      this.show = false;
    } finally {
      this.closing.emit();
    }
  }

  onplay() {
    this.playing = true;
  }
  onstop() {
    this.playing = false;
  }

  constructor(private sr: VehicleSRServerRequestService) {
    super();
  }

  Converter: IConverter<
    Array<ICamera | ImageControlModel>,
    ImageVideoControlModel[]
  > = new MediaVideoControlArrayConverter();

  subscription?: ISubscription | undefined;
  async load(
    source: Array<ICamera | ImageControlModel>
  ): Promise<ImageVideoControlModel[]> {
    let model = this.Converter.Convert(source);

    return model;
  }

  async getData(
    camera: Array<ICamera | ImageControlModel>
  ): Promise<Array<ICamera | ImageControlModel>> {
    return camera;
  }

  async getVideoUrl(
    camera: ICamera,
    mode: PlayMode,
    streamType: StreamType = StreamType.sub,
    interval?: DurationParams
  ): Promise<VideoUrl> {
    switch (mode) {
      case PlayMode.live:
        let params1 = new GetPreviewUrlParams();
        params1.CameraId = camera.Id;
        params1.StreamType = streamType;
        return this.sr.preview(params1);
      case PlayMode.vod:
        let params2 = new GetVodUrlParams();
        params2 = Object.assign(params2, interval);
        params2.CameraId = camera.Id;
        params2.StreamType = streamType;
        return this.sr.playback(params2);
      default:
        throw new Error('video mode error');
    }
  }

  manualCapture(
    stationId: string,
    models: ImageVideoControlModel[]
  ): Promise<ImageVideoControlModel[]> {
    throw new Error('Method not implemented.');
  }

  manualCaptureEvent: EventEmitter<boolean> = new EventEmitter();
}
