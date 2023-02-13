import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';

import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { MediaMultipleWindowConverter } from './media-multiple-window.converter';
import { MediaMultipleWindowModel } from './media-multiple-window.model';

@Injectable()
export class MediaMultipleWindowBusiness
  implements
    IBusiness<GarbageStationGarbageCountStatistic, MediaMultipleWindowModel>
{
  constructor(private stationService: GarbageStationRequestService) {}

  Converter: IConverter<
    GarbageStationGarbageCountStatistic,
    MediaMultipleWindowModel
  > = new MediaMultipleWindowConverter();

  async load(
    statistic: GarbageStationGarbageCountStatistic,
    date?: Date
  ): Promise<MediaMultipleWindowModel> {
    let station = await this.getStation(statistic.Id);
    let model = this.Converter.Convert(statistic, station, date);
    return model;
  }
  getData(stationId: string): Promise<GarbageStationGarbageCountStatistic> {
    throw new Error('Method not implemented.');
  }
  getStation(stationId: string) {
    return this.stationService.cache.get(stationId);
  }
}
