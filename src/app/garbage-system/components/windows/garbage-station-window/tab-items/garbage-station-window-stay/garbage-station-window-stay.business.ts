import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import {
  GetGarbageStationStatisticGarbageCountsParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { GarbageStationWindowStayConverter } from './garbage-station-window-stay.converter';
import { GarbageStationWindowStayModel } from './garbage-station-window-stay.model';

@Injectable()
export class GarbageStationWindowStayBusiness
  implements
  IBusiness<GarbageStationNumberStatisticV2, GarbageStationWindowStayModel>
{
  constructor(private stationService: GarbageStationRequestService) { }
  Converter: IPromiseConverter<
    GarbageStationNumberStatisticV2,
    GarbageStationWindowStayModel
  > = new GarbageStationWindowStayConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    stationId: string,
    date: Date
  ): Promise<GarbageStationWindowStayModel> {
    let data = await this.getData(stationId, date);
    console.log(data);
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
