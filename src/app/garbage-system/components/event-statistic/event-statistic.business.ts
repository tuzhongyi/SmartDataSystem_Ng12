import { Injectable } from '@angular/core';
import { TimeService } from 'src/app/common/service/time.service';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { EventNumberStatistic } from 'src/app/network/model/garbage-station/event-number-statistic.model';
import { GetDivisionEventNumbersParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class EventStatisticBusiness {
  constructor(private divisionRequest: DivisionRequestService) {}

  async getCurrentDivision(id: string) {
    let data = await this.divisionRequest.cache.get(id);
    return data;
  }

  async loadData(
    divisionId: string,
    timeUnit: TimeUnit,
    time: Date
  ): Promise<EventNumberStatistic[]> {
    let beginTime = TimeService.beginTime(time);
    let endTime = TimeService.endTime(time);
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
