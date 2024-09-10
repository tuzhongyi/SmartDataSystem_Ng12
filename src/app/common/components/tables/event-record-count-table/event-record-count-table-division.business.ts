import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class EventRecordCountTableDivisionBusiness {
  constructor(private service: DivisionRequestService) {}
  get(id: string) {
    return this.service.cache.get(id);
  }
  async list(divisionId: string, divisionType: DivisionType) {
    let params = new GetDivisionsParams();
    params.DivisionType = divisionType;
    params.AncestorId = divisionId;
    let paged = await this.service.list(params);
    return paged.Data;
  }

  history(divisionIds: string[], interval: Duration, unit: TimeUnit) {
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = interval.begin;
    params.EndTime = interval.end;
    params.TimeUnit = unit;
    params.DivisionIds = divisionIds;
    return this.service.statistic.number.history.list(params);
  }
}
