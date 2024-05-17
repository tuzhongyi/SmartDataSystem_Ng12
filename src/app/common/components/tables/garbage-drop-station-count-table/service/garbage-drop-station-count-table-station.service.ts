import { Injectable } from '@angular/core';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';

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

  async history(parentId: string, interval: DurationParams, unit: TimeUnit) {
    let stations = await this.array(parentId);
    let stationIds = stations.map((x) => x.Id);

    if (stationIds.length) {
      let params = new GetGarbageStationStatisticNumbersParamsV2();
      params = Object.assign(params, interval);
      params.TimeUnit = unit;
      params.GarbageStationIds = stationIds;
      let res = await this.service.statistic.number.history.list(params);
      return res;
    } else {
      return [];
    }
  }
}
