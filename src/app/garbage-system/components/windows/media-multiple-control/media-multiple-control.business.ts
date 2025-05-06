import { Injectable } from '@angular/core';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { Medium } from 'src/app/common/tools/medium';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { MediaMultipleControlConverter } from './media-multiple-control.converter';
import {
  IMediaMultipleControlBusiness,
  MediaMultipleControlArgs,
  MediaMultipleControlModel,
} from './media-multiple-control.model';

@Injectable()
export class MediaMultipleControlBusiness
  implements IMediaMultipleControlBusiness
{
  constructor(private stationService: GarbageStationRequestService) {}

  Converter: IConverter<MediaMultipleControlArgs, MediaMultipleControlModel> =
    new MediaMultipleControlConverter();

  async load(
    args: MediaMultipleControlArgs
  ): Promise<MediaMultipleControlModel> {
    let station: GarbageStation | undefined = undefined;
    if (args.stationId) {
      station = await this.getStation(args.stationId);
      if (station.Cameras) {
        station.Cameras = station.Cameras.sort((a, b) => {
          return LocaleCompare.compare(a.Name, b.Name);
        });
      }
    }
    let model = this.Converter.Convert(args, station);
    return model;
  }
  getData(stationId: string): Promise<MediaMultipleControlArgs> {
    throw new Error('Method not implemented.');
  }
  getStation(stationId: string) {
    return this.stationService.cache.get(stationId);
  }

  manualCapture(
    id: string,
    medias: ImageVideoControlModel[]
  ): Promise<ImageVideoControlModel[]> {
    return new Promise((resolve) => {
      return this.stationService.manualCapture(id).then((urls) => {
        medias.forEach((media) => {
          urls.forEach((url) => {
            if (
              url.CameraId == media.cameraId &&
              url.Result &&
              media.image &&
              url.Id
            ) {
              media.fulled = false;
              let plain = instanceToPlain(media.image);
              media.image = plainToInstance(ImageControlModel, plain);
              media.image.src = Medium.img(url.Id);
            }
          });
        });
        resolve(medias);
      });
    });
  }
}
