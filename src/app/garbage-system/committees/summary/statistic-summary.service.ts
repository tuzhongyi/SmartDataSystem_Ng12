import { Injectable } from '@angular/core';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/division-number-statistic-v2.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import {
  GetDivisionEventNumbersParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationStatisticNumbersParamsV2 } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';

@Injectable()
export class StatisticSummaryService {
  constructor(
    private divisionService: DivisionRequestService,
    private stationService: GarbageStationRequestService
  ) {}

  async stations(
    stationIds: string[],
    interval: DurationParams,
    unit: TimeUnit
  ): Promise<GarbageStationNumberStatisticV2[]> {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params.BeginTime = interval.BeginTime;
    params.EndTime = interval.EndTime;
    params.TimeUnit = unit;
    params.GarbageStationIds = stationIds;
    let response = await this.stationService.statistic.number.history.list(
      params
    );
    return response;
  }

  async divisions(
    divisionId: string,
    interval: DurationParams,
    unit: TimeUnit
  ): Promise<DivisionNumberStatisticV2[]> {
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = interval.BeginTime;
    params.EndTime = interval.EndTime;
    params.TimeUnit = unit;
    params.DivisionIds = [divisionId];
    let response = await this.divisionService.statistic.number.history.list(
      params
    );
    return response;
  }
  async stationHistory(
    divisionId: string,
    day: DurationParams,
    unit: TimeUnit
  ) {
    let params = new GetDivisionEventNumbersParams();
    params.BeginTime = day.BeginTime;
    params.EndTime = day.EndTime;
    params.TimeUnit = unit;

    let response = await this.divisionService.eventNumber.history.list(
      divisionId,
      params
    );
    return response.Data;
  }
}
