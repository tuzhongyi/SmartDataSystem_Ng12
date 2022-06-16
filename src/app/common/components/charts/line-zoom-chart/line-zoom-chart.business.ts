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
  GetEventRecordsParams,
  GetGarbageDropEventRecordsParams,
} from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import {
  GetGarbageStationStatisticGarbageCountsParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { LineZoomChartConverter } from './line-zoom-chart.converter';
import {
  LineZoomChartModel,
  LineZoomChartSource,
} from './line-zoom-chart.model';

@Injectable()
export class LineZoomChartBusiness
  implements IBusiness<LineZoomChartSource, LineZoomChartModel>
{
  constructor(
    private stationService: GarbageStationRequestService,
    private eventService: EventRequestService
  ) {}
  Converter: IConverter<LineZoomChartSource, LineZoomChartModel> =
    new LineZoomChartConverter();
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
  ): Promise<LineZoomChartSource> {
    let count = await this.getCount(stationId, date);
    let statistic = await this.getRecord(stationId, date);
    return {
      count: count,
      record: statistic,
    };
  }

  getCount(stationId: string, date: Date) {
    let params = new GetGarbageStationStatisticGarbageCountsParams();

    params.GarbageStationIds = [stationId];
    params.Date = date;
    return this.stationService.statistic.garbageCount.history.list(params);
  }

  async getRecord(stationId: string, date: Date) {
    let params = new GetEventRecordsParams();
    let interval = DurationParams.allDay(date);
    params = Object.assign(params, interval);
    params.StationIds = [stationId];
    let paged = await this.eventService.record.IllegalDrop.list(params);

    return paged.Data;
  }
}
