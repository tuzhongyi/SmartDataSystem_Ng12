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
export class GarbageDropStationCountTableDivisionService {
  constructor(private service: DivisionRequestService) {}

  get(id: string) {
    return this.service.cache.get(id);
  }
  async array(parentId: string, type: DivisionType) {
    let params = new GetDivisionsParams();
    params.AncestorId = parentId;
    params.DivisionType = type;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }

  async history(
    parentId: string,
    type: DivisionType,
    interval: Duration,
    unit: TimeUnit
  ) {
    let divisions = await this.array(parentId, type);
    let divisionIds = divisions.map((x) => x.Id);
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = interval.begin;
    params.EndTime = interval.end;
    params.TimeUnit = unit;
    params.DivisionIds = divisionIds;
    return this.service.statistic.number.history.list(params);
  }
}
