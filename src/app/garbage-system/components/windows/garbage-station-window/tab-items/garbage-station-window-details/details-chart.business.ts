import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GetGarbageStationStatisticNumbersParamsV2 } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { DetailsChartLoadOpts } from '../../../charts/details-chart/details-chart.option';

import { GarbageStationWindowDetailsConverter } from './details-chart.converter';

@Injectable()
export class GarbageStationWindowDetailsBusiness
  implements IBusiness<GarbageStationNumberStatisticV2[], number[]>
{
  constructor(private stationService: GarbageStationRequestService) {}
  Converter: IConverter<GarbageStationNumberStatisticV2[], number[]> =
    new GarbageStationWindowDetailsConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(opts: DetailsChartLoadOpts): Promise<number[]> {
    let interval: IntervalParams = new IntervalParams();
    switch (opts.unit) {
      case TimeUnit.Hour:
      case TimeUnit.Day:
        interval = IntervalParams.allDay(opts.date);
        break;
      case TimeUnit.Week:
        interval = IntervalParams.allWeek(opts.date);
        break;
      case TimeUnit.Month:
        interval = IntervalParams.allMonth(opts.date);
        break;
      default:
        break;
    }
    let data = await this.getData(opts.stationId, interval, opts.unit);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(
    stationId: string,
    interval: IntervalParams,
    unit: TimeUnit
  ): Promise<GarbageStationNumberStatisticV2[]> {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params = Object.assign(params, interval);
    params.GarbageStationIds = [stationId];
    params.TimeUnit = unit;
    return this.stationService.statistic.number.history.list(params);    
  }
}
