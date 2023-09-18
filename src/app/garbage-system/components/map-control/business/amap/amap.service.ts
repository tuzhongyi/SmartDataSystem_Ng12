import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationStatisticNumbersParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AMapService {
  constructor(
    private station: GarbageStationRequestService,
    private division: DivisionRequestService
  ) {}

  async drop() {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.GarbageDrop = true;
    let list = await this.station.statistic.number.list(params);
    return list.Data;
  }

  async dropCount(divisionId: string) {
    let statistic = await this.division.statistic.number.get(divisionId);
    return statistic.GarbageDropStationNumber ?? 0;
  }

  all() {
    return this.station.all();
  }
  get(id: string) {
    return this.station.get(id);
  }
}
