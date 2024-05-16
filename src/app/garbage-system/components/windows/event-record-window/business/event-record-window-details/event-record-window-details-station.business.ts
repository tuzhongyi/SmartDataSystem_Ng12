import { Injectable } from '@angular/core';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { EventNumberStatistic } from 'src/app/network/model/garbage-station/event-number-statistic.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import {
  GetGarbageStationStatisticNumbersParamsV2,
  GetGarbageStationVolumesParams,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';

@Injectable()
export class EventRecordWindowDetailsStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  history(
    divisionId: string,
    interval: DurationParams
  ): Promise<GarbageStationNumberStatisticV2[]>;
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
    stationId: string,
    interval: DurationParams,
    unit: TimeUnit
  ) {
    let params = new GetGarbageStationVolumesParams();
    params = Object.assign(params, interval);
    params.TimeUnit = unit;
    let paged = await this.service.eventNumber.history.list(stationId, params);
    return paged.Data;
  }
  private year(stationId: string, interval: DurationParams) {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params.BeginTime = interval.BeginTime;
    params.EndTime = interval.EndTime;
    params.TimeUnit = TimeUnit.Month;
    params.GarbageStationIds = [stationId];
    return this.service.statistic.number.history.list(params);
  }
}
