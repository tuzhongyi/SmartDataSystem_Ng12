import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import {
  GetDivisionStatisticNumbersParams,
  GetDivisionStatisticNumbersParamsV2,
  GetDivisionsParams,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { NumberStatisticModel } from '../illegal-mixinto-rank.model';

@Injectable()
export class IllegalMixintoRankDivisionBusiness {
  constructor(private service: DivisionRequestService) {}

  private convertv1(input: DivisionNumberStatistic) {
    let model = new NumberStatisticModel();
    model.Id = input.Id;
    model.Name = input.Name;
    model.EventNumbers = input.TodayEventNumbers;
    return model;
  }
  private convertv2(input: DivisionNumberStatisticV2) {
    let model = new NumberStatisticModel();
    model.Id = input.Id;
    model.Name = input.Name;
    model.EventNumbers = input.EventNumbers;
    return model;
  }

  private convert(input: DivisionNumberStatistic | DivisionNumberStatisticV2) {
    if (input instanceof DivisionNumberStatistic) {
      return this.convertv1(input);
    } else {
      return this.convertv2(input);
    }
  }

  private async children(parentId: string, type: DivisionType) {
    let params = new GetDivisionsParams();
    params.AncestorId = parentId;
    params.DivisionType = type;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }

  async today(divisionId: string, type: DivisionType) {
    let children = await this.children(divisionId, type);
    let params = new GetDivisionStatisticNumbersParams();
    params.Ids = children
      .filter((x) => x.GarbageStationNumber ?? 0 > 0)
      .map((x) => x.Id);
    let list = await this.service.statistic.number.cache.list(params);
    return list.Data.map((x) => this.convert(x));
  }
  async history(
    divisionId: string,
    type: DivisionType,
    unit: TimeUnit,
    duration: Duration,
  ) {
    let children = await this.children(divisionId, type);
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.TimeUnit = unit;
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.DivisionIds = children
      .filter((x) => x.GarbageStationNumber ?? 0 > 0)
      .map((x) => x.Id);
    let list = await this.service.statistic.number.history.list(params);
    return list.map((x) => this.convert(x));
  }
}
