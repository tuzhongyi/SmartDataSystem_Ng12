import { Injectable } from '@angular/core';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';

@Injectable()
export class EventRecordCountTableStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  get(id: string) {
    return this.service.cache.get(id);
  }

  async list(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.AncestorId = divisionId;
    let paged = await this.service.list(params);
    return paged.Data;
  }

  history(stationIds: string[], interval: DurationParams, unit: TimeUnit) {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params = Object.assign(params, interval);
    params.TimeUnit = unit;
    params.GarbageStationIds = stationIds;
    return this.service.statistic.number.history.list(params);
  }
}
