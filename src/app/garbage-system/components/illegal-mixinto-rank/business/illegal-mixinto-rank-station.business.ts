import { Injectable } from '@angular/core';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import {
  GetGarbageStationStatisticNumbersParams,
  GetGarbageStationStatisticNumbersParamsV2,
  GetGarbageStationsParams,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { NumberStatisticModel } from '../illegal-mixinto-rank.model';

@Injectable()
export class IllegalMixintoRankStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  async list(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    return this.service.all(params);
  }

  private convertv1(input: GarbageStationNumberStatistic) {
    let model = new NumberStatisticModel();
    model.Id = input.Id;
    model.Name = input.Name;
    model.EventNumbers = input.TodayEventNumbers;
    return model;
  }
  private convertv2(input: GarbageStationNumberStatisticV2) {
    let model = new NumberStatisticModel();
    model.Id = input.Id;
    model.Name = input.Name;
    model.EventNumbers = input.EventNumbers;
    return model;
  }

  private convert(
    input: GarbageStationNumberStatistic | GarbageStationNumberStatisticV2
  ) {
    if (input instanceof GarbageStationNumberStatistic) {
      return this.convertv1(input);
    } else {
      return this.convertv2(input);
    }
  }

  async today(divisionId: string) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.DivisionId = divisionId;
    let list = await this.service.statistic.number.cache.list(params);
    return list.Data.map((x) => this.convert(x));
  }

  async history(divisionId: string, unit: TimeUnit, duration: Duration) {
    let stations = await this.list(divisionId);
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params.GarbageStationIds = stations.map((x) => x.Id);
    params.TimeUnit = unit;
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    let list = await this.service.statistic.number.history.list(params);
    return list.map((x) => this.convert(x));
  }
}
