import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import {
  GetDivisionEventNumbersParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { EventRecordWindowDetailsConverter } from '../event-record-window-details.converter';

@Injectable()
export class EventRecordWindowDetailsDivisionBusiness {
  constructor(
    private service: DivisionRequestService,
    private converter: EventRecordWindowDetailsConverter
  ) {}

  async get(divisionId: string) {
    return this.service.cache.get(divisionId);
  }

  async today(divisionId: string) {
    let data = await this.service.statistic.number.get(divisionId);
    return this.converter.division(data);
  }

  async history(divisionId: string, interval: Duration, unit: TimeUnit) {
    let params = new GetDivisionEventNumbersParams();
    params.BeginTime = interval.begin;
    params.EndTime = interval.end;
    switch (unit) {
      case TimeUnit.Day:
      case TimeUnit.Hour:
        params.TimeUnit = TimeUnit.Hour;
        break;
      case TimeUnit.Week:
      default:
        params.TimeUnit = TimeUnit.Day;
        break;
    }
    let paged = await this.service.eventNumber.history.list(divisionId, params);
    let data = await paged.Data.map((x) =>
      this.converter.statistic(divisionId, x)
    );
    if (unit === TimeUnit.Hour) {
      return data;
    }
    if (unit === TimeUnit.Week) {
      let thisweek = DateTimeTool.allWeek(new Date());
      if (interval.begin.getTime() !== thisweek.begin.getTime()) {
        return data;
      }
    }
    if (unit === TimeUnit.Month) {
      let thismonth = DateTimeTool.allMonth(new Date());
      if (interval.begin.getTime() !== thismonth.begin.getTime()) {
        return data;
      }
    }

    let today = await this.today(divisionId);
    return data.concat(today);
  }

  async year(divisionId: string, interval: Duration) {
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = interval.begin;
    params.EndTime = interval.end;
    params.TimeUnit = TimeUnit.Month;
    params.DivisionIds = [divisionId];
    let list = await this.service.statistic.number.history.list(params);
    let data = list.map((x) => this.converter.division(x));
    let today = await this.today(divisionId);
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
