import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import {
  GetGarbageStationStatisticGarbageCountsParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { LineZoomChartConverter } from './line-zoom-chart.converter';
import { LineZoomChartModel } from './line-zoom-chart.model';

@Injectable()
export class LineZoomChartBusiness
  implements
    IBusiness<GarbageStationGarbageCountStatistic[], LineZoomChartModel>
{
  constructor(private stationService: GarbageStationRequestService) {}
  Converter: IConverter<
    GarbageStationGarbageCountStatistic[],
    LineZoomChartModel
  > = new LineZoomChartConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    stationId: string,
    date: Date,
    unit: TimeUnit
  ): Promise<LineZoomChartModel> {
    let data = await this.getData(stationId, date, unit);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(
    stationId: string,
    date: Date,
    unit: TimeUnit
  ): Promise<GarbageStationGarbageCountStatistic[]> {
    let params = new GetGarbageStationStatisticGarbageCountsParams();

    params.GarbageStationIds = [stationId];
    params.Date = date;
    return this.stationService.statistic.garbageCount.history.list(params);
  }
}
