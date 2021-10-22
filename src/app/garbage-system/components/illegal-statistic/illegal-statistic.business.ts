import { Injectable } from '@angular/core';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Time } from 'src/app/global/tool/time';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { GetDivisionEventNumbersParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { StationRequestService } from 'src/app/network/request/station/garbage-station-request.service';

@Injectable()
export class IllegalStatisticBusiness {
  constructor(
    private divisionRequest: DivisionRequestService,
    private stationRequest: StationRequestService
  ) {}

  async getCurrentDivision(id: string) {
    let data = await this.divisionRequest.get(id);
    return data;
  }
  async statistic(
    divisionId: string,
    timeUnit: TimeUnit,
    time: Date
  ): Promise<EventNumberStatistic[]> {
    let beginTime = Time.beginTime(time);
    let endTime = Time.endTime(time);
    const params = new GetDivisionEventNumbersParams();
    params.TimeUnit = timeUnit;
    params.BeginTime = beginTime;
    params.EndTime = endTime;
    params.PageIndex = 1;
    params.PageSize = 9999;

    let res = await this.divisionRequest.eventNumber.history.list(
      divisionId,
      params
    );
    return res.Data;
  }
}
