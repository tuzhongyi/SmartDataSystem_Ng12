import { EventEmitter, Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import {
  PlayMode,
  VideoModel,
} from 'src/app/common/components/video-player/video.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { CameraImageUrl, VideoUrl } from 'src/app/network/model/url.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { Medium } from 'src/app/common/tools/medium';
import {
  GetPreviewUrlParams,
  GetVodUrlParams,
} from 'src/app/network/request/ai-sr-server/sr-server.params';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import { ICamera } from 'src/app/network/model/camera.interface';
import { Camera } from 'src/app/network/model/camera.model';
import { MediaVideoControlArrayConverter } from './media-control.converter';
import { IMediaControlBusiness } from './media-control.model';

@Injectable()
export class MediaVideoControlBussiness implements IMediaControlBusiness {
  constructor(
    private srService: SRServerRequestService,
    private stationService: GarbageStationRequestService
  ) {}
  manualCaptureEvent: EventEmitter<boolean> = new EventEmitter();

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
        return this.srService.preview(params1);
      case PlayMode.vod:
        let params2 = new GetVodUrlParams();
        params2 = Object.assign(params2, interval);
        params2.CameraId = camera.Id;
        params2.StreamType = streamType;
        return this.srService.playback(params2);
      default:
        throw new Error('video mode error');
    }
  }

  manualCapture(stationId: string, models: ImageVideoControlModel[]) {
    this.manualCaptureEvent.emit(true);
    return timer(1000)
      .toPromise()
      .then((x) => {
        return this.stationService.manualCapture(stationId).then((urls) => {
          try {
            if (models) {
              for (let i = 0; i < models.length; i++) {
                for (let j = 0; j < urls.length; j++) {
                  const url = urls[j];
                  if (
                    url.CameraId == models[i].cameraId &&
                    url.Result &&
                    models[i].image &&
                    url.Id
                  ) {
                    models[i].image!.src = Medium.jpg(url.Id);
                  }
                }
              }
            }
            return models;
          } finally {
            this.manualCaptureEvent.emit(false);
          }
        });
      });
  }
}
