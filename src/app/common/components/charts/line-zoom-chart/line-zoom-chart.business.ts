import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { GetGarbageStationStatisticGarbageCountsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
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
    let station = await this.getStation(stationId);
    let data = await this.getData(stationId, date, unit);
    // console.log(data);
    let model = this.Converter.Convert(data);
    if (station.CountSchedule && station.CountSchedule.length) {
      // 测试代码
      // station.CountSchedule[0].BeginTime = new Time(8, 5, 10);
      // station.CountSchedule[0].EndTime = new Time(19, 10, 10);
      model.timeRange = station.CountSchedule[0];
    }
    // console.log(model);
    return model;
  }
  async getData(
    stationId: string,
    date: Date,
    unit: TimeUnit
  ): Promise<LineZoomChartSource> {
    let count = await this.getCount(stationId, date);
    let statistic = await this.getRecord(stationId, date);
    // console.log('count', count);

    // console.log('statistic', statistic);
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
  getStation(stationId: string) {
    return this.stationService.get(stationId);
  }
}
