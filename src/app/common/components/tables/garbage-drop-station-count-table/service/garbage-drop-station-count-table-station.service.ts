import { Injectable } from '@angular/core';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class GarbageDropStationCountTableStationService {
  constructor(private service: GarbageStationRequestService) {}

  get(id: string) {
    return this.service.cache.get(id);
  }

  async array(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }

  async history(parentId: string, interval: Duration, unit: TimeUnit) {
    let stations = await this.array(parentId);
    let stationIds = stations.map((x) => x.Id);

    if (stationIds.length) {
      let params = new GetGarbageStationStatisticNumbersParamsV2();
      params.BeginTime = interval.begin;
      params.EndTime = interval.end;
      params.TimeUnit = unit;
      params.GarbageStationIds = stationIds;
      let res = await this.service.statistic.number.history.list(params);
      return res;
    } else {
      return [];
    }
  }
}
