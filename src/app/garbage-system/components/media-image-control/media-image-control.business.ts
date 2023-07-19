import { EventEmitter, Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { timer } from 'rxjs';
import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { Medium } from 'src/app/common/tools/medium';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { MediaVideoControlArrayConverter } from './media-image-control.converter';
import { IMediaImageControlBusiness } from './media-image-control.model';

@Injectable()
export class MediaVideoControlBussiness implements IMediaImageControlBusiness {
  constructor(
    private srService: SRServerRequestService,
    private stationService: GarbageStationRequestService
  ) {}
  manualCaptureEvent: EventEmitter<boolean> = new EventEmitter();

  Converter: IConverter<Array<ImageControlModel>, ImageVideoControlModel[]> =
    new MediaVideoControlArrayConverter();

  subscription?: ISubscription | undefined;
  async load(
    source: Array<ImageControlModel>
  ): Promise<ImageVideoControlModel[]> {
    let model = this.Converter.Convert(source);

    return model;
  }

  async getData(
    camera: Array<ImageControlModel>
  ): Promise<Array<ImageControlModel>> {
    return camera;
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
                    let plain = instanceToPlain(models[i].image);
                    let img = plainToInstance(ImageControlModel, plain);
                    img.src = Medium.img(url.Id);
                    models[i].image = img;
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
