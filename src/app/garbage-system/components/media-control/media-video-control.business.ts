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
import { Camera } from 'src/app/network/model/camera.model';
import { CameraImageUrl, VideoUrl } from 'src/app/network/model/url.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { Medium } from 'src/app/common/tools/medium';
import {
  GetPreviewUrlParams,
  GetVodUrlParams,
} from 'src/app/network/request/ai-sr-server/sr-server.params';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';

@Injectable()
export class MediaVideoControlBussiness
  implements
    IBusiness<Array<Camera | ImageControlModel>, ImageVideoControlModel[]>
{
  constructor(
    private srService: SRServerRequestService,
    private stationService: GarbageStationRequestService
  ) {}
  manualCaptureEvent: EventEmitter<boolean> = new EventEmitter();

  Converter: IConverter<
    Array<Camera | ImageControlModel>,
    ImageVideoControlModel[]
  > = new MediaVideoControlArrayConverter();

  subscription?: ISubscription | undefined;
  async load(
    source: Array<Camera | ImageControlModel>
  ): Promise<ImageVideoControlModel[]> {
    let model = this.Converter.Convert(source);

    return model;
  }

  async getData(
    camera: Array<Camera | ImageControlModel>
  ): Promise<Array<Camera | ImageControlModel>> {
    return camera;
  }

  async getVideoUrl(
    camera: Camera,
    mode: PlayMode,
    streamType: StreamType = StreamType.main,
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

class MediaVideoControlArrayConverter
  implements
    IConverter<Array<Camera | ImageControlModel>, ImageVideoControlModel[]>
{
  converter = {
    item: new MediaVideoControlConverter(),
  };
  Convert(
    source: (Camera | ImageControlModel)[],
    onerror = true
  ): ImageVideoControlModel[] {
    let array: ImageVideoControlModel[] = [];
    for (let i = 0; i < source.length; i++) {
      let model: ImageVideoControlModel;
      let item = source[i];
      if (item instanceof Camera) {
        model = this.converter.item.Convert(item, onerror);
      } else {
        model = this.converter.item.Convert(item, onerror, item.eventTime);
      }

      array.push(model);
    }
    return array;
  }
}

class MediaVideoControlConverter
  implements IConverter<Camera | ImageControlModel, ImageVideoControlModel>
{
  private converter = {
    image: new ImageControlConverter(),
  };
  Convert(
    source: Camera | ImageControlModel,
    onerror = true,
    eventTime?: Date
  ): ImageVideoControlModel {
    let model: ImageVideoControlModel;
    if (source instanceof Camera) {
      model = new ImageVideoControlModel(source.GarbageStationId, source.Id);
      model.image = this.converter.image.Convert(source, onerror, eventTime);
    } else {
      model = new ImageVideoControlModel(source.stationId, source.id);
      model.image = source;
    }

    return model;
  }
}
