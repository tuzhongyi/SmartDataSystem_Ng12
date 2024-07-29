import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { GetGarbageStationStatisticNumbersParamsV2 } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageDropStationWindowItemDurationConverter } from './garbage-drop-window-item-duration.converter';
import { GarbageDropStationWindowItemDurationModel } from './garbage-drop-window-item-duration.model';

@Injectable()
export class GarbageDropStationWindowItemDurationBusiness
  implements
    IBusiness<
      GarbageStationNumberStatisticV2,
      GarbageDropStationWindowItemDurationModel
    >
{
  constructor(private stationService: GarbageStationRequestService) {}
  Converter: IPromiseConverter<
    GarbageStationNumberStatisticV2,
    GarbageDropStationWindowItemDurationModel
  > = new GarbageDropStationWindowItemDurationConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    stationId: string,
    date: Date
  ): Promise<GarbageDropStationWindowItemDurationModel> {
    let data = await this.getData(stationId, date);
    // console.log(data);
    let model = await this.Converter.Convert(data, {
      station: (id: string) => {
        return this.stationService.cache.get(id);
      },
    });
    return model;
  }
  async getData(
    stationId: string,
    date: Date
  ): Promise<GarbageStationNumberStatisticV2> {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    let interval = DurationParams.allDay(date);
    params = Object.assign(params, interval);
    params.GarbageStationIds = [stationId];
    params.TimeUnit = TimeUnit.Day;
    let datas = await this.stationService.statistic.number.history.list(params);
    return datas[0];
  }
}
