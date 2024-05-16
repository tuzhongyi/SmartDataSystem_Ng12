import { Injectable } from '@angular/core';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { EventNumberStatistic } from 'src/app/network/model/garbage-station/event-number-statistic.model';
import {
  GetDivisionEventNumbersParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';

@Injectable()
export class EventRecordWindowDetailsDivisionBusiness {
  constructor(private service: DivisionRequestService) {}

  async get(divisionId: string) {
    return this.service.cache.get(divisionId);
  }

  history(
    divisionId: string,
    interval: DurationParams
  ): Promise<DivisionNumberStatisticV2[]>;
  history(
    divisionId: string,
    interval: DurationParams,
    unit: TimeUnit
  ): Promise<EventNumberStatistic[]>;

  history(divisionId: string, interval: DurationParams, unit?: TimeUnit) {
    if (unit) {
      return this._history(divisionId, interval, unit);
    } else {
      return this.year(divisionId, interval);
    }
  }

  private async _history(
    divisionId: string,
    interval: DurationParams,
    unit: TimeUnit
  ) {
    let params = new GetDivisionEventNumbersParams();
    params = Object.assign(params, interval);
    params.TimeUnit = unit;
    let paged = await this.service.eventNumber.history.list(divisionId, params);
    return paged.Data;
  }

  private year(divisionId: string, interval: DurationParams) {
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = interval.BeginTime;
    params.EndTime = interval.EndTime;
    params.TimeUnit = TimeUnit.Month;
    params.DivisionIds = [divisionId];
    return this.service.statistic.number.history.list(params);
  }
}
