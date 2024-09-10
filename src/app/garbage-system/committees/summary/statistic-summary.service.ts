import { Injectable } from '@angular/core';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import {
  GetDivisionEventNumbersParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationStatisticNumbersParamsV2 } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class StatisticSummaryService {
  constructor(
    private divisionService: DivisionRequestService,
    private stationService: GarbageStationRequestService
  ) {}

  async stations(
    stationIds: string[],
    interval: Duration,
    unit: TimeUnit
  ): Promise<GarbageStationNumberStatisticV2[]> {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params.BeginTime = interval.begin;
    params.EndTime = interval.end;
    params.TimeUnit = unit;
    params.GarbageStationIds = stationIds;
    let response = await this.stationService.statistic.number.history.list(
      params
    );
    return response;
  }

  async divisions(
    divisionId: string,
    interval: Duration,
    unit: TimeUnit
  ): Promise<DivisionNumberStatisticV2[]> {
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = interval.begin;
    params.EndTime = interval.end;
    params.TimeUnit = unit;
    params.DivisionIds = [divisionId];
    let response = await this.divisionService.statistic.number.history.list(
      params
    );
    return response;
  }
  async stationHistory(divisionId: string, day: Duration, unit: TimeUnit) {
    let params = new GetDivisionEventNumbersParams();
    params.BeginTime = day.begin;
    params.EndTime = day.end;
    params.TimeUnit = unit;

    let response = await this.divisionService.eventNumber.history.list(
      divisionId,
      params
    );
    return response.Data;
  }
}
