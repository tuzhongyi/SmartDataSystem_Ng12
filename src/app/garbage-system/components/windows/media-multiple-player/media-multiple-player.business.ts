import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { MediaMultiplePlayerConverter } from './media-multiple-player.converter';
import {
  MediaMultiplePlayerArgs,
  MediaMultiplePlayerModel,
} from './media-multiple-player.model';

@Injectable()
export class MediaMultiplePlayerBusiness
  implements IBusiness<MediaMultiplePlayerArgs, MediaMultiplePlayerModel>
{
  constructor(private stationService: GarbageStationRequestService) {}

  Converter: IConverter<MediaMultiplePlayerArgs, MediaMultiplePlayerModel> =
    new MediaMultiplePlayerConverter();

  async load(args: MediaMultiplePlayerArgs): Promise<MediaMultiplePlayerModel> {
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
  getData(stationId: string): Promise<MediaMultiplePlayerArgs> {
    throw new Error('Method not implemented.');
  }
  getStation(stationId: string) {
    return this.stationService.cache.get(stationId);
  }
}
