import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import {
  GetGarbageStationStatisticNumbersParamsV2,
  GetGarbageStationVolumesParams,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { EventRecordWindowDetailsConverter } from '../event-record-window-details.converter';
import { BusinessTool } from './business.tool';

@Injectable()
export class EventRecordWindowDetailsStationBusiness {
  constructor(
    private service: GarbageStationRequestService,
    private converter: EventRecordWindowDetailsConverter
  ) {}

  private tool = new BusinessTool();

  private async today(stationId: string) {
    let data = await this.service.statistic.number.cache.get(stationId);
    return this.converter.station(data);
  }
  private stop(time: Date, unit: TimeUnit) {
    if (unit == TimeUnit.Day) {
      if (DateTimeTool.is.today(time)) {
        true;
      }
    } else if (unit == TimeUnit.Hour) {
      if (DateTimeTool.is.equal.hour(time, new Date())) {
        return true;
      }
    } else {
    }

    switch (unit) {
      case TimeUnit.Hour:
        return DateTimeTool.is.equal.hour(time, new Date());
      case TimeUnit.Day:
        return DateTimeTool.is.today(time);
      case TimeUnit.Month:
        return DateTimeTool.is.equal.month(time, new Date());

      default:
        return false;
    }
  }

  async history(stationId: string, duration: Duration, unit: TimeUnit) {
    let params = new GetGarbageStationVolumesParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    switch (unit) {
      case TimeUnit.Year:
        params.TimeUnit = TimeUnit.Month;
        break;
      case TimeUnit.Day:
      case TimeUnit.Hour:
        params.TimeUnit = TimeUnit.Hour;
        break;
      case TimeUnit.Week:
      case TimeUnit.Month:
      default:
        params.TimeUnit = TimeUnit.Day;
        break;
    }
    let paged = await this.service.eventNumber.history.list(stationId, params);
    if (paged.Data.length == 0) {
      return [];
    }
    let data = paged.Data.map((x) => this.converter.statistic(stationId, x));
    if (DateTimeTool.is.than.unit(duration.end, new Date(), params.TimeUnit)) {
      let today = await this.today(stationId);
      data = data.concat(today);
    }
    let times = DateTimeTool.full.unit(duration.begin, unit);
    data = this.tool.full(data, times, params.TimeUnit, (index: number) =>
      this.converter.create(stationId, times[index])
    );

    return data;
  }

  async year(stationId: string, duration: Duration) {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
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
    let times = DateTimeTool.full.unit(duration.begin, TimeUnit.Year);
    data = this.tool.full(data, times, params.TimeUnit, (index: number) =>
      this.converter.create(stationId, times[index])
    );
    return data;
  }
}
