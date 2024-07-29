import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import {
  GetGarbageStationStatisticNumbersParamsV2,
  GetGarbageStationVolumesParams,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { EventRecordWindowDetailsConverter } from '../event-record-window-details.converter';

@Injectable()
export class EventRecordWindowDetailsStationBusiness {
  constructor(
    private service: GarbageStationRequestService,
    private converter: EventRecordWindowDetailsConverter
  ) {}

  async today(stationId: string) {
    let data = await this.service.statistic.number.cache.get(stationId);
    return this.converter.station(data);
  }

  async history(stationId: string, duration: DurationParams, unit: TimeUnit) {
    let params = new GetGarbageStationVolumesParams();
    params = Object.assign(params, duration);
    params.TimeUnit = unit;
    let paged = await this.service.eventNumber.history.list(stationId, params);
    let data = await paged.Data.map((x) =>
      this.converter.statistic(stationId, x)
    );
    if (DateTimeTool.isToday(duration.EndTime)) {
      let today = await this.today(stationId);
      return data.concat(today);
    }
    return data;
  }
  async year(stationId: string, interval: DurationParams) {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params.BeginTime = interval.BeginTime;
    params.EndTime = interval.EndTime;
    params.TimeUnit = TimeUnit.Month;
    params.GarbageStationIds = [stationId];
    let list = await this.service.statistic.number.history.list(params);
    let data = list.map((x) => this.converter.station(x));
    let today = await this.today(stationId);
    let now = new Date();
    if (now.getDate() === 1) {
      data = data.concat(today);
    } else {
      data[data.length - 1].EventNumbers?.forEach((x) => {
        let event = today.EventNumbers?.find(
          (y) => y.EventType === x.EventType
        );
        if (event) {
          x.DayNumber += event.DayNumber;
        }
      });
    }
    return data;
  }
}
