import { Injectable } from '@angular/core';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { EventStatisticConverter } from 'src/app/converter/event-statistic.converter';
import { StatisticLineEChartsConverter } from 'src/app/converter/statistic-line-eCharts.converter';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { TimeService } from 'src/app/common/tools/time';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { EventNumber } from 'src/app/network/model/event-number.model';
import { GetDivisionEventNumbersParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { EChartsLineModel } from 'src/app/view-model/echarts-line.model';

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
