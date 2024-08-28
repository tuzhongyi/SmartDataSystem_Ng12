import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { MediaMultipleControlConverter } from './media-multiple-control.converter';
import {
  MediaMultipleControlArgs,
  MediaMultipleControlModel,
} from './media-multiple-control.model';

@Injectable()
export class MediaMultipleControlBusiness
  implements IBusiness<MediaMultipleControlArgs, MediaMultipleControlModel>
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
}
