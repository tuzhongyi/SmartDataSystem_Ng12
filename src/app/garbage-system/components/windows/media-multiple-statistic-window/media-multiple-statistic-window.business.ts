import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';

import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { MediaMultipleControlBusiness } from '../media-multiple-control/media-multiple-control.business';
import { MediaMultipleStatisticWindowConverter } from './media-multiple-statistic-window.converter';
import {
  MediaMultipleStatisticWindowArgs,
  MediaMultipleStatisticWindowModel,
} from './media-multiple-statistic-window.model';

@Injectable()
export class MediaMultipleStatisticWindowBusiness
  extends MediaMultipleControlBusiness
  implements
    IBusiness<
      MediaMultipleStatisticWindowArgs,
      MediaMultipleStatisticWindowModel
    >
{
  constructor(stationService: GarbageStationRequestService) {
    super(stationService);
  }

  Converter: IConverter<
    MediaMultipleStatisticWindowArgs,
    MediaMultipleStatisticWindowModel
  > = new MediaMultipleStatisticWindowConverter();

  async load(
    args: MediaMultipleStatisticWindowArgs
  ): Promise<MediaMultipleStatisticWindowModel> {
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

  getData(stationId: string): Promise<MediaMultipleStatisticWindowArgs> {
    throw new Error('Method not implemented.');
  }
}
