import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { MediaMultipleWindowConverter } from './media-multiple-window.converter';
import {
  MediaMultipleWindowArgs,
  MediaMultipleWindowModel,
} from './media-multiple-window.model';

@Injectable()
export class MediaMultipleWindowBusiness
  implements IBusiness<MediaMultipleWindowArgs, MediaMultipleWindowModel>
{
  constructor(private stationService: GarbageStationRequestService) {}

  Converter: IConverter<MediaMultipleWindowArgs, MediaMultipleWindowModel> =
    new MediaMultipleWindowConverter();

  async load(
    args: MediaMultipleWindowArgs,
    date?: Date
  ): Promise<MediaMultipleWindowModel> {
    let station: GarbageStation | undefined = undefined;
    if (args.stationId) {
      station = await this.getStation(args.stationId);
      if (station.Cameras) {
        station.Cameras = station.Cameras.sort((a, b) => {
          return LocaleCompare.compare(a.Name, b.Name);
        });
      }
    }
    let model = this.Converter.Convert(args, station, date);
    return model;
  }
  getData(stationId: string): Promise<MediaMultipleWindowArgs> {
    throw new Error('Method not implemented.');
  }
  getStation(stationId: string) {
    return this.stationService.cache.get(stationId);
  }
}
